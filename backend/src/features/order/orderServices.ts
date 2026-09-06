import { OrderStatus, Prisma } from "../../generated/prisma";
import prisma from "../../shared/config/prisma";
import stripe from "../../shared/config/stripe";
import {
  allOrdersQueryInput,
  orderQueryInput,
  placeOrderInput,
} from "../../shared/types/orderTypes";
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

export const getMyOrdersService = async (
  userId: string,
  input: orderQueryInput,
) => {
  const limit = 10;
  const { page, status } = input;
  const skip = (page - 1) * limit;
  const where = {
    userId,
    ...(status ? { status } : {}),
  };

  const [orders, statusCounts, totalOrders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),

    prisma.order.groupBy({
      by: ["status"],
      where: { userId },
      _count: {
        _all: true,
      },
    }),

    prisma.order.count({
      where: { userId },
    }),

    prisma.order.count({
      where,
    }),
  ]);

  const formattedStatusCounts = statusCounts.map((s) => ({
    status: s.status,
    count: s._count._all,
  }));

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    orders,
    statusCounts: formattedStatusCounts,
    totalOrders,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export const getMySingleOrderService = async (
  orderNumber: string,
  userId: string,
) => {
  const order = await prisma.order.findFirst({
    where: { orderNumber, userId },
    include: {
      items: {
        include: {
          product: true,
          seller: true,
        },
      },
      address: true,
      coupon: true,
    },
  });

  if (!order) throw new ApiError(404, "Order not found.");

  return order;
};

export const getAdminOrdersService = async (input: allOrdersQueryInput) => {
  const {
    page,
    from,
    to,
    paymentMethod,
    paymentStatus,
    search,
    status,
    sortBy,
  } = input;

  const limit = 10;
  const skip = (page - 1) * limit;

  const fromDate = from ? new Date(`${from}T00:00:00`) : undefined;
  const toDate = to ? new Date(`${to}T23:59:59.999`) : undefined;

  const where: Prisma.OrderWhereInput = {
    ...(search
      ? {
          OR: [
            {
              orderNumber: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              user: {
                firstName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              user: {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {}),

    ...(status ? { status } : {}),

    ...(paymentMethod
      ? {
          paymentMethod: paymentMethod.toUpperCase() as "CASH" | "ONLINE",
        }
      : {}),

    ...(paymentStatus ? { paymentStatus } : {}),

    ...(fromDate || toDate
      ? {
          createdAt: {
            ...(fromDate ? { gte: fromDate } : {}),
            ...(toDate ? { lte: toDate } : {}),
          },
        }
      : {}),
  };

  const orderBy: Prisma.OrderOrderByWithRelationInput =
    sortBy === "highest"
      ? { total: "desc" }
      : sortBy === "lowest"
        ? { total: "asc" }
        : sortBy === "oldest"
          ? { createdAt: "asc" }
          : { createdAt: "desc" };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        user: true,
        items: true,
        coupon: true,
      },
    }),

    prisma.order.count({
      where,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    orders,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export const cancelOrderService = async (id: string, userId: string) => {
  const order = await prisma.order.update({
    where: { id, userId },
    data: { status: "CANCELLED" },
  });
  if (!order) throw new ApiError(404, "Order not found.");

  return { message: "Order cancelled successfully." };
};

export const adminCancelOrderService = async (id: string) => {
  const order = await prisma.order.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
  if (!order) throw new ApiError(404, "Order not found.");

  return { message: "Order cancelled successfully." };
};

export const getSellerOrdersService = async (
  sellerId: string,
  input: allOrdersQueryInput,
) => {
  const {
    page,
    from,
    paymentMethod,
    paymentStatus,
    search,
    sortBy,
    status,
    to,
  } = input;

  const limit = 10;
  const skip = (page - 1) * limit;

  const fromDate = from ? new Date(`${from}T00:00:00`) : undefined;
  const toDate = to ? new Date(`${to}T23:59:59.999`) : undefined;

  const sellerOrderItems = await prisma.orderItem.findMany({
    where: { sellerId },
    select: { orderId: true },
    distinct: ["orderId"],
  });

  const orderIds = sellerOrderItems.map((item) => item.orderId);

  const where: Prisma.OrderWhereInput = {
    id: { in: orderIds },
    ...(search
      ? {
          OR: [
            {
              orderNumber: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              user: {
                firstName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              user: {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {}),

    ...(status ? { status } : {}),

    ...(paymentMethod
      ? {
          paymentMethod: paymentMethod.toUpperCase() as "CASH" | "ONLINE",
        }
      : {}),

    ...(paymentStatus ? { paymentStatus } : {}),

    ...(fromDate || toDate
      ? {
          createdAt: {
            ...(fromDate ? { gte: fromDate } : {}),
            ...(toDate ? { lte: toDate } : {}),
          },
        }
      : {}),
  };

  const orderBy: Prisma.OrderOrderByWithRelationInput =
    sortBy === "highest"
      ? { total: "desc" }
      : sortBy === "lowest"
        ? { total: "asc" }
        : sortBy === "oldest"
          ? { createdAt: "asc" }
          : { createdAt: "desc" };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      include: {
        items: { where: { sellerId } },
        user: true,
        coupon: true,
      },
      orderBy,
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    orders,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
