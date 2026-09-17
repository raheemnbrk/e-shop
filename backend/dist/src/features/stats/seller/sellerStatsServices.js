"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerDashboardSalesServices = exports.sellerDashboardStatsService = void 0;
const prisma_1 = __importDefault(require("../../../shared/config/prisma"));
const sellerDashboardStatsService = async (sellerId) => {
    const [totalProducts, totalOrders, totalCustomers, lowStockProducts, recentItems, topSellingProducts, paidOrders, ordersByStatus,] = await Promise.all([
        prisma_1.default.product.count({ where: { sellerId } }),
        prisma_1.default.orderItem.findMany({
            where: { sellerId },
            select: { orderId: true },
            distinct: ["orderId"],
        }),
        prisma_1.default.orderItem.findMany({
            where: { sellerId },
            select: { order: { select: { userId: true } } },
            distinct: ["orderId"],
        }),
        prisma_1.default.product.findMany({
            where: { sellerId, stock: { lt: 10 } },
            take: 5,
        }),
        prisma_1.default.orderItem.findMany({
            where: { sellerId },
            select: { orderId: true },
            distinct: ["orderId"],
            orderBy: { order: { createdAt: "desc" } },
            take: 5,
        }),
        prisma_1.default.orderItem.groupBy({
            by: ["productId", "productName", "productImage", "productSlug"],
            where: { sellerId, order: { paymentStatus: "PAID" } },
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: "desc" } },
            take: 5,
        }),
        prisma_1.default.order.findMany({
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
        prisma_1.default.order.groupBy({
            by: ["status"],
            where: {
                items: {
                    some: {
                        sellerId,
                    },
                },
            },
            _count: {
                _all: true,
            },
            orderBy: {
                _count: {
                    status: "desc",
                },
            },
        }),
    ]);
    const totalRevenue = paidOrders.reduce((acc, order) => acc + order.total, 0);
    const uniqueCustomers = new Set(totalCustomers.map((item) => item.order.userId)).size;
    const orderIds = recentItems.map((item) => item.orderId);
    const recentOrders = await prisma_1.default.order.findMany({
        where: { id: { in: orderIds } },
        orderBy: { createdAt: "desc" },
        include: {
            items: { where: { sellerId } },
            user: {
                select: { firstName: true, lastName: true, image: true },
            },
        },
    });
    const customerMap = new Map();
    for (const order of paidOrders) {
        const existing = customerMap.get(order.userId);
        if (existing) {
            existing.totalSpent += order.total;
            existing.orders += 1;
        }
        else {
            customerMap.set(order.userId, { totalSpent: order.total, orders: 1 });
        }
    }
    const customerIds = [...customerMap.keys()];
    const customers = await prisma_1.default.user.findMany({
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
    const formattedOrderByStatus = ordersByStatus.map((s) => ({
        status: s.status,
        count: s._count._all,
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
        ordersByStatus: formattedOrderByStatus,
    };
};
exports.sellerDashboardStatsService = sellerDashboardStatsService;
const sellerDashboardSalesServices = async (sellerId, period) => {
    const selectedPeriod = period.period;
    const now = new Date();
    const startDate = new Date(now);
    if (selectedPeriod === "7d")
        startDate.setDate(startDate.getDate() - 6);
    if (selectedPeriod === "30d")
        startDate.setDate(startDate.getDate() - 29);
    if (selectedPeriod === "12m") {
        startDate.setMonth(startDate.getMonth() - 11);
        startDate.setDate(1);
    }
    const orders = await prisma_1.default.order.findMany({
        where: {
            createdAt: { gte: startDate, lte: now },
            status: { not: "CANCELLED" },
            paymentStatus: "PAID",
            items: { some: { sellerId } },
        },
        select: {
            createdAt: true,
            total: true,
        },
        orderBy: { createdAt: "asc" },
    });
    const data = [];
    if (selectedPeriod === "12m") {
        for (let i = 0; i < 12; i++) {
            const date = new Date(startDate);
            date.setMonth(startDate.getMonth() + i);
            const year = date.getFullYear();
            const month = date.getMonth();
            const monthOrders = orders.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return (orderDate.getFullYear() === year && orderDate.getMonth() === month);
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
    }
    else {
        const days = selectedPeriod === "7d" ? 7 : 30;
        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const dayOrders = orders.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return (orderDate.getFullYear() === year &&
                    orderDate.getMonth() === month &&
                    orderDate.getDate() === day);
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
exports.sellerDashboardSalesServices = sellerDashboardSalesServices;
