import prisma from "../../../shared/config/prisma";

export const getCustomerStatsService = async (userId: string) => {
  const [ordersCount, totalOrders, cart, reviewsCount] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.order.findMany({
      where: { userId, paymentStatus: "PAID", status: { not: "CANCELLED" } },
      select: { total: true },
    }),
    prisma.cart.findFirst({
      where: { userId },
      select: { items: true },
    }),
    prisma.review.count({ where: { userId } }),
  ]);

  const totalSpent = totalOrders.reduce((acc, order) => acc + order.total, 0);

  return {
    ordersCount,
    totalSpent: Number(totalSpent.toFixed(2)),
    cartItemsCount: Array.isArray(cart?.items) ? cart.items.length : 0,
    reviewsCount,
  };
};
