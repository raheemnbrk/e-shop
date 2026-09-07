import prisma from "../../../shared/config/prisma";
import { dashboardPeriodInput } from "../../../shared/types/adminType";

export const adminDashboardSalesServices = async (
  period: dashboardPeriodInput,
): Promise<{
  period: dashboardPeriodInput["period"];
  totalSales: number;
  totalOrders: number;
  data: {
    date: string;
    sales: number;
    orders: number;
  }[];
}> => {
  const selectedPeriod = period.period;
  const now = new Date();
  const startDate = new Date(now);

  if (selectedPeriod === "7d") {
    startDate.setDate(startDate.getDate() - 6);
  }

  if (selectedPeriod === "30d") {
    startDate.setDate(startDate.getDate() - 29);
  }

  if (selectedPeriod === "12m") {
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1);
  }

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: now,
      },
      status: {
        not: "CANCELLED",
      },
      paymentStatus: "PAID",
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const data: {
    date: string;
    sales: number;
    orders: number;
  }[] = [];

  if (selectedPeriod === "12m") {
    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);

      const year = date.getFullYear();
      const month = date.getMonth();

      const monthOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);

        return (
          orderDate.getFullYear() === year && orderDate.getMonth() === month
        );
      });

      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        sales: monthOrders.reduce((sum, order) => sum + Number(order.total), 0),
        orders: monthOrders.length,
      });
    }
  } else {
    const days = selectedPeriod === "7d" ? 7 : 30;

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const dayOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);

        return (
          orderDate.getFullYear() === year &&
          orderDate.getMonth() === month &&
          orderDate.getDate() === day
        );
      });

      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        sales: dayOrders.reduce((sum, order) => sum + Number(order.total), 0),
        orders: dayOrders.length,
      });
    }
  }

  return {
    period: selectedPeriod,
    totalSales: data.reduce((sum, item) => sum + item.sales, 0),
    totalOrders: data.reduce((sum, item) => sum + item.orders, 0),
    data,
  };
};

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
    ordersByStatus,
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
      where: {
        order: {
          paymentStatus: "PAID",
        },
      },
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
        paymentStatus: "PAID",
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
    prisma.order.groupBy({
      by: ["status"],
      _count: { _all: true },
      orderBy: { _count: { status: "desc" } },
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

  const formattedOrderByStatus = ordersByStatus.map((s) => ({
    status: s.status,
    count: s._count._all,
  }));

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
    ordersByStatus: formattedOrderByStatus,
  };
};
