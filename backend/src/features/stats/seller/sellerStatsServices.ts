import prisma from "../../../shared/config/prisma";

export const sellerDashboardStatsService = async (sellerId: string) => {
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    lowStockProducts,
    recentItems,
    topSellingProducts,
    paidOrders,
  ] = await Promise.all([
    prisma.product.count({ where: { sellerId } }),

    prisma.orderItem.findMany({
      where: { sellerId },
      select: { orderId: true },
      distinct: ["orderId"],
    }),

    prisma.orderItem.findMany({
      where: { sellerId },
      select: { order: { select: { userId: true } } },
      distinct: ["orderId"],
    }),

    prisma.product.findMany({
      where: { sellerId, stock: { lt: 10 } },
      take: 5,
    }),

    prisma.orderItem.findMany({
      where: { sellerId },
      select: { orderId: true },
      distinct: ["orderId"],
      orderBy: { order: { createdAt: "desc" } },
      take: 5,
    }),

    prisma.orderItem.groupBy({
      by: ["productId", "productName", "productImage", "productSlug"],
      where: { sellerId, order: { paymentStatus: "PAID" } },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),

    prisma.order.findMany({
      where: {
        paymentStatus: "PAID",
        status: { not: "CANCELLED" },
        items: { some: { sellerId } },
      },
      select: {
        userId: true,
        total: true,
      },
    }),
  ]);

  const totalRevenue = paidOrders.reduce((acc, order) => acc + order.total, 0);

  const uniqueCustomers = new Set(
    totalCustomers.map((item) => item.order.userId),
  ).size;

  const orderIds = recentItems.map((item) => item.orderId);

  const recentOrders = await prisma.order.findMany({
    where: { id: { in: orderIds } },
    orderBy: { createdAt: "desc" },
    include: {
      items: { where: { sellerId } },
      user: {
        select: { firstName: true, lastName: true, image: true },
      },
    },
  });

  const customerMap = new Map<string, { totalSpent: number; orders: number }>();

  for (const order of paidOrders) {
    const existing = customerMap.get(order.userId);

    if (existing) {
      existing.totalSpent += order.total;
      existing.orders += 1;
    } else {
      customerMap.set(order.userId, { totalSpent: order.total, orders: 1 });
    }
  }

  const customerIds = [...customerMap.keys()];

  const customers = await prisma.user.findMany({
    where: { id: { in: customerIds } },
    select: { id: true, firstName: true, lastName: true, image: true },
  });

  const formattedTopCustomers = customers
    .map((customer) => {
      const data = customerMap.get(customer.id);
      return {
        userId: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        image: customer.image,
        totalSpent: Number((data?.totalSpent ?? 0).toFixed(2)),
        orders: data?.orders ?? 0,
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  const formattedTopSellingProducts = topSellingProducts.map((product) => ({
    productId: product.productId,
    productName: product.productName,
    productImage: product.productImage,
    productSlug: product.productSlug,
    sold: product._sum.quantity ?? 0,
  }));

  return {
    stats: {
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalProducts,
      totalOrders: totalOrders.length,
      totalCustomers: uniqueCustomers,
    },
    lowStockProducts,
    recentOrders,
    topSellingProducts: formattedTopSellingProducts,
    topCustomers: formattedTopCustomers,
  };
};
