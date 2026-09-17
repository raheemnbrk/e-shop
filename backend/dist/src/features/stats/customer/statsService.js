"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerStatsService = void 0;
const prisma_1 = __importDefault(require("../../../shared/config/prisma"));
const getCustomerStatsService = async (userId) => {
    const [ordersCount, totalOrders, cart, reviewsCount] = await Promise.all([
        prisma_1.default.order.count({ where: { userId } }),
        prisma_1.default.order.findMany({
            where: { userId, paymentStatus: "PAID", status: { not: "CANCELLED" } },
            select: { total: true },
        }),
        prisma_1.default.cart.findFirst({
            where: { userId },
            select: { items: true },
        }),
        prisma_1.default.review.count({ where: { userId } }),
    ]);
    const totalSpent = totalOrders.reduce((acc, order) => acc + order.total, 0);
    return {
        ordersCount,
        totalSpent: Number(totalSpent.toFixed(2)),
        cartItemsCount: Array.isArray(cart?.items) ? cart.items.length : 0,
        reviewsCount,
    };
};
exports.getCustomerStatsService = getCustomerStatsService;
