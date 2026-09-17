"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderInvoiceService = exports.getSellerOrdersService = exports.adminCancelOrderService = exports.cancelOrderService = exports.getAdminOrdersService = exports.getMySingleOrderService = exports.getMyOrdersService = exports.placeOrderService = void 0;
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const stripe_1 = __importDefault(require("../../shared/config/stripe"));
const apiError_1 = require("../../shared/utils/apiError");
const emailActions_1 = require("../../shared/utils/emails/emailActions");
const generateInvoice_1 = require("../../shared/utils/generateInvoice");
const generateOrderNumber_1 = require("../../shared/utils/generateOrderNumber");
const placeOrderService = async (userId, input) => {
    const { addressId, deliveryMethod, paymentMethod, couponCode, note } = input;
    const address = await prisma_1.default.address.findFirst({
        where: { id: addressId, userId },
    });
    if (!address)
        throw new apiError_1.ApiError(404, "Address is not found.");
    const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found.");
    const cart = await prisma_1.default.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
    });
    if (!cart || cart.items.length === 0)
        throw new apiError_1.ApiError(400, "Cart is empty.");
    for (const item of cart.items) {
        if (!item.product.available)
            throw new apiError_1.ApiError(400, `${item.product.name} is not available`);
        if (item.quantity > item.product.stock)
            throw new apiError_1.ApiError(400, `Not enough stock for ${item.product.name}`);
    }
    const subTotal = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);
    const itemsDiscount = cart.items.reduce((acc, item) => {
        if (item.product.discount > 0)
            return (acc + item.product.price * (item.product.discount / 100) * item.quantity);
        return acc;
    }, 0);
    let coupon = null;
    let couponDiscount = 0;
    if (couponCode) {
        coupon = await prisma_1.default.coupon.findUnique({ where: { code: couponCode } });
        if (!coupon)
            throw new apiError_1.ApiError(404, "Coupon not found.");
        if (coupon.expiresAt && coupon.expiresAt < new Date())
            throw new apiError_1.ApiError(400, "Coupon is expired.");
        if (!coupon.isActive)
            throw new apiError_1.ApiError(400, "Coupon is not active");
        if (coupon.maxUses <= coupon.usedCount)
            throw new apiError_1.ApiError(400, "Coupon has reached its usage limit.");
        const afterDiscount = subTotal - itemsDiscount;
        couponDiscount =
            coupon.type === "PERCENTAGE"
                ? (afterDiscount * coupon.discount) / 100
                : coupon.discount;
    }
    const shippingCost = deliveryMethod === "EXPRESS" ? 9.99 : 0;
    const total = subTotal - itemsDiscount - couponDiscount + shippingCost;
    const orderNumber = (0, generateOrderNumber_1.generateOrderNumber)();
    const order = await prisma_1.default.$transaction(async (tx) => {
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
                throw new apiError_1.ApiError(400, `Not enough stock from ${item.product.name}`);
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
                throw new apiError_1.ApiError(400, "Coupon has reached its usage limit.");
            }
        }
        await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
        return newOrder;
    });
    if (paymentMethod === "CASH") {
        (0, emailActions_1.sendOrderConfirmationEmail)(user.email, user.firstName, order.orderNumber, order.items, order.discount, order.subtotal, order.total, order.shippingCost, order.deliveryMethod);
        return {
            message: "Order placed successfully.",
            paymentMethod: "CASH",
            orderNumber: order.orderNumber,
            checkoutUrl: null,
        };
    }
    const session = await stripe_1.default.checkout.sessions.create({
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
                unit_amount: Math.round(item.product.price * (1 - item.product.discount / 100) * 100),
            },
            quantity: item.quantity,
        })),
        metadata: {
            orderId: order.id,
            userId,
            orderNumber: order.orderNumber,
        },
        success_url: `${process.env.CLIENT_URL}/orders/` + `${order.id}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}/checkout?cancelled=true`,
    });
    await prisma_1.default.order.update({
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
        orderNumber: order.orderNumber,
        checkoutUrl: session.url,
    };
};
exports.placeOrderService = placeOrderService;
const getMyOrdersService = async (userId, input) => {
    const limit = 10;
    const { page, status } = input;
    const skip = (page - 1) * limit;
    const where = {
        userId,
        ...(status ? { status } : {}),
    };
    const [orders, statusCounts, totalOrders, total] = await Promise.all([
        prisma_1.default.order.findMany({
            where,
            include: { items: true },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma_1.default.order.groupBy({
            by: ["status"],
            where: { userId },
            _count: {
                _all: true,
            },
        }),
        prisma_1.default.order.count({
            where: { userId },
        }),
        prisma_1.default.order.count({
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
exports.getMyOrdersService = getMyOrdersService;
const getMySingleOrderService = async (orderNumber, userId) => {
    const order = await prisma_1.default.order.findFirst({
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
    if (!order)
        throw new apiError_1.ApiError(404, "Order not found.");
    return order;
};
exports.getMySingleOrderService = getMySingleOrderService;
const getAdminOrdersService = async (input) => {
    const { page, from, to, paymentMethod, paymentStatus, search, status, sortBy, } = input;
    const limit = 10;
    const skip = (page - 1) * limit;
    const fromDate = from ? new Date(`${from}T00:00:00`) : undefined;
    const toDate = to ? new Date(`${to}T23:59:59.999`) : undefined;
    const where = {
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
                paymentMethod: paymentMethod.toUpperCase(),
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
    const orderBy = sortBy === "highest"
        ? { total: "desc" }
        : sortBy === "lowest"
            ? { total: "asc" }
            : sortBy === "oldest"
                ? { createdAt: "asc" }
                : { createdAt: "desc" };
    const [orders, total] = await Promise.all([
        prisma_1.default.order.findMany({
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
        prisma_1.default.order.count({
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
exports.getAdminOrdersService = getAdminOrdersService;
const cancelOrderService = async (id, userId) => {
    const order = await prisma_1.default.order.findFirst({
        where: { id, userId },
        include: { items: true },
    });
    if (!order)
        throw new apiError_1.ApiError(404, "Order not found.");
    if (order.status === "CANCELLED")
        throw new apiError_1.ApiError(400, "Order is already cancelled.");
    if (order.status === "SHIPPED" || order.status === "DELIVERED")
        throw new apiError_1.ApiError(400, "Cannot cancel an order that has been shipped or delivered.");
    await prisma_1.default.$transaction(async (tx) => {
        await tx.order.update({
            where: { id },
            data: { status: "CANCELLED" },
        });
        for (const item of order.items) {
            if (item.productId) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { increment: item.quantity } },
                });
            }
        }
    });
    return { message: "Order cancelled successfully." };
};
exports.cancelOrderService = cancelOrderService;
const adminCancelOrderService = async (id) => {
    const order = await prisma_1.default.order.findUnique({
        where: { id },
        include: { items: true },
    });
    if (!order)
        throw new apiError_1.ApiError(404, "Order not found.");
    if (order.status === "CANCELLED")
        throw new apiError_1.ApiError(400, "Order is already cancelled.");
    if (order.status === "SHIPPED" || order.status === "DELIVERED")
        throw new apiError_1.ApiError(400, "Cannot cancel an order that has been shipped or delivered.");
    await prisma_1.default.$transaction(async (tx) => {
        await tx.order.update({
            where: { id },
            data: { status: "CANCELLED" },
        });
        for (const item of order.items) {
            if (item.productId) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { increment: item.quantity } },
                });
            }
        }
    });
    return { message: "Order cancelled successfully." };
};
exports.adminCancelOrderService = adminCancelOrderService;
const getSellerOrdersService = async (sellerId, input) => {
    const { page, from, paymentMethod, paymentStatus, search, sortBy, status, to, } = input;
    const limit = 10;
    const skip = (page - 1) * limit;
    const fromDate = from ? new Date(`${from}T00:00:00`) : undefined;
    const toDate = to ? new Date(`${to}T23:59:59.999`) : undefined;
    const sellerOrderItems = await prisma_1.default.orderItem.findMany({
        where: { sellerId },
        select: { orderId: true },
        distinct: ["orderId"],
    });
    const orderIds = sellerOrderItems.map((item) => item.orderId);
    const where = {
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
                paymentMethod: paymentMethod.toUpperCase(),
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
    const orderBy = sortBy === "highest"
        ? { total: "desc" }
        : sortBy === "lowest"
            ? { total: "asc" }
            : sortBy === "oldest"
                ? { createdAt: "asc" }
                : { createdAt: "desc" };
    const [orders, total] = await Promise.all([
        prisma_1.default.order.findMany({
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
        prisma_1.default.order.count({ where }),
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
exports.getSellerOrdersService = getSellerOrdersService;
const generateOrderInvoiceService = async (orderNumber, userId) => {
    const order = await prisma_1.default.order.findFirst({
        where: {
            orderNumber,
            userId,
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                },
            },
            address: true,
            items: {
                select: {
                    productName: true,
                    price: true,
                    quantity: true,
                    discount: true,
                },
            },
        },
    });
    if (!order) {
        throw new apiError_1.ApiError(404, "Order not found.");
    }
    return (0, generateInvoice_1.generateInvoicePDF)(order);
};
exports.generateOrderInvoiceService = generateOrderInvoiceService;
// export const sellerCancelOrderService = async (
//   sellerId: string,
//   id: string,
// ) => {
//   const order = prisma.order.update({where : {}})
// };
