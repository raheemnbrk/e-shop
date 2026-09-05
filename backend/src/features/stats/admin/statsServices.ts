import prisma from "../../../shared/config/prisma";

export const adminDashboardStatsServices = async () => {
  const [
    totalOrders,
    totalProducts,
    totalCustomers,
    totalSellers,
    recentOrders,
    lowStockProducts,
    topSellingProducts,
    topCustomers,
  ] = await Promise.all([
    prisma.order.count(),

    prisma.product.count({
      where: {
        available: true,
      },
    }),

    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

    prisma.user.count({
      where: {
        role: "SELLER",
      },
    }),

    prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
        user: true,
      },
    }),

    prisma.product.findMany({
      where: {
        stock: {
          lt: 10,
        },
      },
    }),

    prisma.orderItem.groupBy({
      by: ["productId", "productName", "productImage", "productSlug"],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    }),

    prisma.order.groupBy({
      by: ["userId"],
      where: {
        status: {
          not: "CANCELLED",
        },
      },
      _sum: {
        total: true,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          total: "desc",
        },
      },
      take: 5,
    }),
  ]);

  const formattedTopSellingProducts = topSellingProducts.map((product) => ({
    productId: product.productId,
    productName: product.productName,
    productImage: product.productImage,
    productSlug: product.productSlug,
    sold: product._sum.quantity ?? 0,
  }));

  const customerIds = topCustomers
    .map((customer) => customer.userId)
    .filter((id): id is string => id !== null);

  const customers = await prisma.user.findMany({
    where: {
      id: {
        in: customerIds,
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      image: true,
    },
  });

  const formattedTopCustomers = topCustomers.map((customer) => {
    const user = customers.find((user) => user.id === customer.userId);

    return {
      userId: customer.userId,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      image: user?.image ?? null,
      totalSpent: customer._sum.total ?? 0,
      orders: customer._count.id,
    };
  });

  const stats = {
    totalOrders,
    totalProducts,
    totalCustomers,
    totalSellers,
  };

  return {
    stats,
    recentOrders,
    lowStockProducts,
    topSellingProducts: formattedTopSellingProducts,
    topCustomers: formattedTopCustomers,
  };
};
