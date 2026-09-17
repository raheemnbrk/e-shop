"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderService = exports.updateOrderStatusService = exports.getCustomerProfileService = exports.changeRoleService = exports.getAllSellersService = exports.deleteUserService = exports.getAllUsersService = exports.rejectSellerServices = exports.approveSellerServices = void 0;
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const apiError_1 = require("../../shared/utils/apiError");
const approveSellerServices = async (userId) => {
    const seller = await prisma_1.default.seller.findUnique({ where: { userId } });
    if (!seller)
        throw new apiError_1.ApiError(404, "Seller not found.");
    if (seller.status === "APPROVED")
        throw new apiError_1.ApiError(400, "The seller is already approved.");
    await prisma_1.default.$transaction([
        prisma_1.default.seller.update({
            where: { userId },
            data: { status: "APPROVED" },
        }),
        prisma_1.default.user.update({
            where: { id: userId },
            data: { role: "SELLER" },
        }),
    ]);
    return { message: "Seller approved successfully." };
};
exports.approveSellerServices = approveSellerServices;
const rejectSellerServices = async (userId) => {
    const seller = await prisma_1.default.seller.findUnique({ where: { userId } });
    if (!seller)
        throw new apiError_1.ApiError(404, "Seller not found.");
    if (seller.status === "REJECTED")
        throw new apiError_1.ApiError(400, "The seller is already rejected.");
    await prisma_1.default.seller.update({
        where: { userId },
        data: { status: "REJECTED" },
    });
    return { message: "Seller rejected successfully." };
};
exports.rejectSellerServices = rejectSellerServices;
const getAllUsersService = async (id, input) => {
    const { page, search, role } = input;
    const limit = 10;
    const skip = (page - 1) * limit;
    const where = {
        id: { not: id },
        ...(role && { role }),
        ...(search && {
            OR: [
                {
                    firstName: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    lastName: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                ...(search.includes(" ")
                    ? [
                        {
                            AND: [
                                {
                                    firstName: {
                                        contains: search.split(/\s+/)[0],
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    lastName: {
                                        contains: search.split(/\s+/).slice(1).join(" "),
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                    ]
                    : []),
            ],
        }),
    };
    const [users, totalUsers] = await Promise.all([
        prisma_1.default.user.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            omit: { password: true },
        }),
        prisma_1.default.user.count({ where }),
    ]);
    const totalPages = Math.ceil(totalUsers / limit);
    return {
        users,
        pagination: {
            currentPage: page,
            totalPages,
            totalUsers,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
};
exports.getAllUsersService = getAllUsersService;
const deleteUserService = async (id) => {
    const user = await prisma_1.default.user.delete({ where: { id } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found");
    return {
        message: "User deleted successfully.",
    };
};
exports.deleteUserService = deleteUserService;
const getAllSellersService = async (input) => {
    const { search, page, status } = input;
    const limit = 10;
    const skip = (page - 1) * limit;
    const where = {
        ...(status && { status }),
        ...(search && {
            OR: [
                {
                    storeName: {
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
                ...(search.includes(" ")
                    ? [
                        {
                            user: {
                                AND: [
                                    {
                                        firstName: {
                                            contains: search.split(/\s+/)[0],
                                            mode: "insensitive",
                                        },
                                    },
                                    {
                                        lastName: {
                                            contains: search.split(/\s+/).slice(1).join(" "),
                                            mode: "insensitive",
                                        },
                                    },
                                ],
                            },
                        },
                    ]
                    : []),
            ],
        }),
    };
    const [sellers, totalSellers] = await Promise.all([
        prisma_1.default.seller.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                user: {
                    createdAt: "desc",
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        image: true,
                        phoneNumber: true,
                        createdAt: true,
                    },
                },
            },
        }),
        prisma_1.default.seller.count({
            where,
        }),
    ]);
    const totalPages = Math.ceil(totalSellers / limit);
    return {
        sellers: sellers.map(({ user, ...seller }) => ({
            ...user,
            Seller: seller,
        })),
        pagination: {
            currentPage: page,
            totalPages,
            totalSellers,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
};
exports.getAllSellersService = getAllSellersService;
const changeRoleService = async (id, role) => {
    if (role === "SELLER") {
        throw new apiError_1.ApiError(400, "Seller role must be granted through the seller application flow");
    }
    const user = await prisma_1.default.user.update({
        where: { id },
        data: { role: role },
    });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found.");
    return { message: "User role is updated successfully." };
};
exports.changeRoleService = changeRoleService;
const getCustomerProfileService = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
        include: {
            Seller: true,
            _count: {
                select: { orders: true },
            },
            orders: {
                orderBy: { createdAt: "desc" },
                take: 10,
                select: {
                    id: true,
                    orderNumber: true,
                    createdAt: true,
                    total: true,
                    status: true,
                },
            },
        },
    });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found.");
    const { orders, _count, ...userData } = user;
    const paidOrders = await prisma_1.default.order.findMany({
        where: {
            userId,
            paymentStatus: "PAID",
            status: { not: "CANCELLED" },
        },
        select: { total: true },
    });
    const totalSpent = paidOrders.reduce((acc, o) => acc + o.total, 0);
    const lastOrderDate = orders[0]?.createdAt ?? null;
    const avgOrderValue = paidOrders.length > 0 ? totalSpent / paidOrders.length : 0;
    const cancelledOrders = await prisma_1.default.order.count({
        where: {
            userId,
            status: "CANCELLED",
        },
    });
    return {
        user: userData,
        stats: {
            totalOrders: _count.orders,
            totalSpent: Number(totalSpent.toFixed(2)),
            avgOrderValue: Number(avgOrderValue.toFixed(2)),
            lastOrderDate,
        },
        recentOrders: orders,
        cancelledOrders,
    };
};
exports.getCustomerProfileService = getCustomerProfileService;
const updateOrderStatusService = async (id, input) => {
    const { status } = input;
    const order = await prisma_1.default.order.findUnique({ where: { id } });
    if (!order)
        throw new apiError_1.ApiError(404, "Order not found.");
    if (order.status === status)
        throw new apiError_1.ApiError(400, `Order is already ${status}.`);
    if (order.paymentMethod === "CASH" && status === "DELIVERED") {
        await prisma_1.default.order.update({
            where: { id },
            data: { paymentStatus: "PAID", status: "DELIVERED" },
        });
    }
    else {
        await prisma_1.default.order.update({
            where: { id },
            data: { status: status },
        });
    }
    return { message: "Order is updated successfully." };
};
exports.updateOrderStatusService = updateOrderStatusService;
const getOrderService = async (orderNumber) => {
    const order = await prisma_1.default.order.findUnique({
        where: { orderNumber },
        include: { items: true, user: true, address: true },
    });
    if (!order)
        throw new apiError_1.ApiError(404, "Order not found.");
    return order;
};
exports.getOrderService = getOrderService;
