import prisma from "../../shared/config/prisma";
import { placeOrderInput } from "../../shared/types/orderTypes";
import { ApiError } from "../../shared/utils/apiError";
import { generateOrderNumber } from "../../shared/utils/generateOrderNumber";

export const placeOrderService = async (
  userId: string,
  input: placeOrderInput,
) => {
  const { addressId, deliveryMethod, couponCode, paymentMethod, note } = input;

  const address = await prisma.address.findUnique({ where: { id: addressId } });
  if (!address) throw new ApiError(404, "Address not found.");

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0)
    throw new ApiError(404, "Cart is empty");

  for (const item of cart.items) {
    if (!item.product.available)
      throw new ApiError(400, `${item.product.name} is not available`);

    if (item.quantity > item.product.stock)
      throw new ApiError(400, `Not enough stock for ${item.product.name}`);
  }

  const subtotal = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const itemDiscount = cart.items.reduce((acc, item) => {
    if (item.product.discount > 0) {
      return (
        acc + item.product.price * (item.product.discount / 100) * item.quantity
      );
    }

    return acc;
  }, 0);

  let coupon = null;
  let couponDiscount = 0;

  if (couponCode) {
    coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });

    if (!coupon) throw new ApiError(404, "Coupon not found.");
    if (!coupon.isActive) throw new ApiError(400, "Coupon is not active");
    if (coupon.expiresAt && coupon.expiresAt < new Date())
      throw new ApiError(400, "Coupon is expired");
    if (coupon.maxUses < coupon.usedCount)
      throw new ApiError(400, "Coupon has reached it usage limit.");

    const afterDiscount = subtotal - itemDiscount;
    couponDiscount = (afterDiscount * coupon.discountPercent) / 100;
  }

  const shippingCost = deliveryMethod === "EXPRESS" ? 9.99 : 0;

  const total = subtotal - itemDiscount - couponDiscount + shippingCost;

  const orderNumber = generateOrderNumber();

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        addressId,
        userId,
        subtotal,
        total,
        shippingCost,
        paymentMethod,
        deliveryMethod,
        ...(coupon && { couponId: coupon.id }),
        note,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            price: item.product.price,
            quantity: item.quantity,
            discount: item.product.discount,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                slug: true,
                images: true,
                price: true,
                discount: true,
              },
            },
          },
        },
        address: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
        coupon: {
          select: {
            code: true,
            discountPercent: true,
          },
        },
      },
    });

    for (const item of cart.items) {
      const result = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });

      if (result.count === 0)
        throw new ApiError(400, `Not enough stock for ${item.product.name}.`);
    }

    if (coupon) {
      await tx.coupon.update({
        where: { id: coupon.id },
        data: { usedCount: { increment: 1 } },
      });
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return newOrder;
  });

  return {
    message: "Order placed Successfully",
    orderId: order.id,
  };
};
