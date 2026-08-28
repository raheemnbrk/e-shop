import { session } from "passport";
import prisma from "../../shared/config/prisma";
import stripe from "../../shared/config/stripe";
import { placeOrderInput } from "../../shared/types/orderTypes";
import { ApiError } from "../../shared/utils/apiError";
import { sendOrderConfirmationEmail } from "../../shared/utils/emails/emailActions";
import { generateOrderNumber } from "../../shared/utils/generateOrderNumber";

export const placeOrderService = async (
  userId: string,
  input: placeOrderInput,
) => {
  const { addressId, deliveryMethod, paymentMethod, couponCode, note } = input;

  const address = await prisma.address.findFirst({
    where: { id: addressId, userId },
  });
  if (!address) throw new ApiError(404, "Address is not found.");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new ApiError(404, "User not found.");

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0)
    throw new ApiError(400, "Cart is empty.");

  for (const item of cart.items) {
    if (!item.product.available)
      throw new ApiError(400, `${item.product.name} is not available`);
    if (item.quantity > item.product.stock)
      throw new ApiError(400, `Not enough stock for ${item.product.name}`);
  }

  const subTotal = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const itemsDiscount = cart.items.reduce((acc, item) => {
    if (item.product.discount > 0)
      return (
        acc + item.product.price * (item.product.discount / 100) * item.quantity
      );
    return acc;
  }, 0);

  let coupon: Awaited<ReturnType<typeof prisma.coupon.findUnique>> | null =
    null;
  let couponDiscount = 0;

  if (couponCode) {
    coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
    if (!coupon) throw new ApiError(404, "Coupon not found.");
    if (coupon.expiresAt && coupon.expiresAt < new Date())
      throw new ApiError(400, "Coupon is expired.");
    if (!coupon.isActive) throw new ApiError(400, "Coupon is not active");
    if (coupon.maxUses <= coupon.usedCount)
      throw new ApiError(400, "Coupon has reached its usage limit.");

    const afterDiscount = subTotal - itemsDiscount;

    couponDiscount =
      coupon.type === "PERCENTAGE"
        ? (afterDiscount * coupon.discount) / 100
        : coupon.discount;
  }

  const shippingCost = deliveryMethod === "EXPRESS" ? 9.99 : 0;

  const total = subTotal - itemsDiscount - couponDiscount + shippingCost;

  const orderNumber = generateOrderNumber();

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        addressId,
        userId,
        deliveryMethod,
        paymentMethod,
        total,
        shippingCost,
        subtotal: subTotal,
        discount: itemsDiscount + couponDiscount,
        ...(note && { note }),
        ...(coupon && { couponId: coupon.id }),
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            productSlug: item.product.slug,
            productImage: item.product.images[0] ?? "",
            sellerId: item.product.sellerId,
            price: item.product.price,
            quantity: item.quantity,
            discount: item.product.discount,
          })),
        },
      },
      include: { items: true },
    });

    for (const item of cart.items) {
      const result = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });

      if (result.count === 0)
        throw new ApiError(400, `Not enough stock from ${item.product.name}`);
    }

    if (coupon) {
      const result = await tx.coupon.updateMany({
        where: {
          id: coupon.id,
          isActive: true,
          usedCount: {
            lt: coupon.maxUses,
          },
        },
        data: {
          usedCount: {
            increment: 1,
          },
        },
      });

      if (result.count === 0) {
        throw new ApiError(400, "Coupon has reached its usage limit.");
      }
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return newOrder;
  });

  if (paymentMethod === "CASH") {
    sendOrderConfirmationEmail(
      user.email,
      user.firstName,
      order.orderNumber,
      order.items,
      order.discount,
      order.subtotal,
      order.total,
      order.shippingCost,
      order.deliveryMethod,
    );

    return {
      message: "Order placed successfully.",
      paymentMethod: "CASH",
      orderId: order.id,
      checkoutUrl: null,
    };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: cart.items.map((item) => ({
      price_data: {
        currency: "usd",

        product_data: {
          name: item.product.name,

          ...(item.product.images[0]
            ? {
                images: [item.product.images[0]],
              }
            : {}),
        },

        unit_amount: Math.round(
          item.product.price * (1 - item.product.discount / 100) * 100,
        ),
      },
      quantity: item.quantity,
    })),

    metadata: {
      orderId: order.id,
      userId,
      orderNumber: order.orderNumber,
    },

    success_url:
      `${process.env.CLIENT_URL}/orders/` + `${order.id}?success=true`,

    cancel_url: `${process.env.CLIENT_URL}/checkout?cancelled=true`,
  });

  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      stripeSessionId: session.id,
    },
  });

  return {
    message: "Order created. Please complete your payment.",
    paymentMethod: "ONLINE",
    orderId: order.id,
    checkoutUrl: session.url,
  };
};
