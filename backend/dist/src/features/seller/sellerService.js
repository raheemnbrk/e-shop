"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderService = exports.updateOrderStatusService = exports.getSellerProfileForAdminService = exports.getSellerCustomersServices = exports.updateSellerServices = exports.applySellerService = void 0;
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const apiError_1 = require("../../shared/utils/apiError");
const uploadImage_1 = require("../../shared/utils/uploadImage");
const slugify_1 = __importDefault(require("slugify"));
const applySellerService = async (userId, input, file) => {
    const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found.");
    if (user.role === "ADMIN")
        throw new apiError_1.ApiError(403, "Admins can not apply as sellers.");
    let slug = (0, slugify_1.default)(input.storeName, { lower: true, strict: true });
    const existingApplications = await prisma_1.default.seller.findUnique({
        where: { userId },
    });
    if (existingApplications) {
        if (existingApplications.status === "PENDING")
            throw new apiError_1.ApiError(400, "You already have a pending application.");
        if (existingApplications.status === "APPROVED")
            throw new apiError_1.ApiError(400, "you are already an approved seller");
        if (existingApplications.status === "REJECTED") {
            const takenSlug = await prisma_1.default.seller.findFirst({
                where: { storeSlug: slug },
            });
            if (takenSlug)
                slug = `${slug}-${new Date()}`;
            const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const logoUrl = await (0, uploadImage_1.uploadImage)(base64, "e-shop/sellers");
            await prisma_1.default.seller.update({
                where: { userId },
                data: { userId, ...input, storeSlug: slug, logo: logoUrl },
            });
            return {
                message: "Your seller application has been submitted successfully.",
            };
        }
    }
    const takenSlug = await prisma_1.default.seller.findFirst({
        where: { storeSlug: slug, NOT: { userId } },
    });
    if (takenSlug)
        throw new apiError_1.ApiError(400, "this store slug is taken.");
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const logoURl = await (0, uploadImage_1.uploadImage)(base64, "e-shop/sellers");
    await prisma_1.default.seller.create({
        data: { userId, ...input, storeSlug: slug, logo: logoURl },
    });
    return {
        message: "Your seller application has been submitted successfully.",
    };
};
exports.applySellerService = applySellerService;
const updateSellerServices = async (sellerId, input, file) => {
    const seller = await prisma_1.default.seller.findUnique({
        where: { userId: sellerId },
    });
    if (!seller)
        throw new apiError_1.ApiError(404, "Seller not found.");
    const { storeName, description } = input;
    let imageUrl;
    if (file) {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        imageUrl = await (0, uploadImage_1.uploadImage)(base64, `e-shop/sellers`);
    }
    let storeSlug;
    if (storeName && storeName !== seller.storeName) {
        storeSlug = (0, slugify_1.default)(storeName, { lower: true, strict: true });
        const existingSlug = await prisma_1.default.seller.findFirst({
            where: { storeSlug },
        });
        if (existingSlug)
            storeSlug = `${storeSlug}-${Date.now()}`;
    }
    await prisma_1.default.seller.update({
        where: { userId: sellerId },
        data: {
            ...(storeName && { storeName }),
            ...(description && { description }),
            ...(storeSlug && { storeSlug }),
            ...(imageUrl && { logo: imageUrl }),
        },
    });
    return seller;
};
exports.updateSellerServices = updateSellerServices;
const getSellerCustomersServices = async (sellerId, input) => {
    const { customerType, page, sortBy, search } = input;
    const limit = 10;
    const skip = (page - 1) * limit;
    const where = {
        status: {
            not: "CANCELLED",
        },
        items: {
            some: {
                product: {
                    sellerId,
                },
            },
        },
        user: search
            ? {
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
                    {
                        email: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            }
            : undefined,
    };
    const orders = await prisma_1.default.order.findMany({
        where,
        select: {
            userId: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    image: true,
                },
            },
            items: {
                where: {
                    product: {
                        sellerId,
                    },
                },
                select: {
                    quantity: true,
                    price: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const customersMap = new Map();
    for (const order of orders) {
        const totalSpent = order.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
        const existingCustomer = customersMap.get(order.userId);
        if (existingCustomer) {
            existingCustomer.orders += 1;
            existingCustomer.totalSpent += totalSpent;
            if (order.createdAt > existingCustomer.lastOrder) {
                existingCustomer.lastOrder = order.createdAt;
            }
        }
        else {
            customersMap.set(order.userId, {
                userId: order.user.id,
                firstName: order.user.firstName,
                lastName: order.user.lastName,
                email: order.user.email,
                image: order.user.image,
                orders: 1,
                totalSpent,
                lastOrder: order.createdAt,
            });
        }
    }
    let customers = Array.from(customersMap.values());
    if (customerType === "new") {
        customers = customers.filter((customer) => customer.orders === 1);
    }
    if (customerType === "returning") {
        customers = customers.filter((customer) => customer.orders > 1);
    }
    customers.sort((a, b) => {
        switch (sortBy) {
            case "highest_spending":
                return b.totalSpent - a.totalSpent;
            case "most_orders":
                return b.orders - a.orders;
            case "latest_order":
                return b.lastOrder.getTime() - a.lastOrder.getTime();
            case "newest":
            default:
                return b.lastOrder.getTime() - a.lastOrder.getTime();
        }
    });
    const total = customers.length;
    const paginatedCustomers = customers.slice(skip, skip + limit);
    return {
        customers: paginatedCustomers,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getSellerCustomersServices = getSellerCustomersServices;
const getSellerProfileForAdminService = async (slug) => {
    const normalizedSlug = decodeURIComponent(slug).trim();
    const seller = await prisma_1.default.seller.findFirst({
        where: {
            OR: [{ storeSlug: normalizedSlug }, { userId: normalizedSlug }],
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                    image: true,
                    createdAt: true,
                },
            },
            products: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    price: true,
                    discount: true,
                    images: true,
                    stock: true,
                    available: true,
                    createdAt: true,
                    category: { select: { name: true } },
                },
            },
        },
    });
    if (!seller)
        throw new apiError_1.ApiError(404, "Seller not found.");
    const [totalOrders, revenueData] = await Promise.all([
        prisma_1.default.orderItem.findMany({
            where: { sellerId: seller.userId },
            select: { orderId: true },
            distinct: ["orderId"],
        }),
        prisma_1.default.order.findMany({
            where: {
                paymentStatus: "PAID",
                status: { not: "CANCELLED" },
                items: { some: { sellerId: seller.userId } },
            },
            select: { total: true },
        }),
    ]);
    const totalRevenue = revenueData.reduce((acc, order) => acc + order.total, 0);
    return {
        seller,
        stats: {
            totalProducts: seller.products.length,
            totalOrders: totalOrders.length,
            totalRevenue: Number(totalRevenue.toFixed(2)),
        },
    };
};
exports.getSellerProfileForAdminService = getSellerProfileForAdminService;
const updateOrderStatusService = async (id, sellerId, input) => {
    const order = await prisma_1.default.order.findFirst({
        where: { id, items: { some: { sellerId } } },
    });
    if (!order)
        throw new apiError_1.ApiError(404, "Order not found.");
    await prisma_1.default.order.update({
        where: { id },
        data: { status: input.status },
    });
    return { message: "Order is updated successfully." };
};
exports.updateOrderStatusService = updateOrderStatusService;
const getOrderService = async (sellerId, orderNumber) => {
    const order = await prisma_1.default.order.findFirst({
        where: {
            orderNumber,
            items: {
                some: { sellerId },
            },
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            address: true,
            items: {
                where: { sellerId },
                select: {
                    id: true,
                    productName: true,
                    productImage: true,
                    productSlug: true,
                    price: true,
                    quantity: true,
                    discount: true,
                    sellerId: true,
                },
            },
        },
    });
    if (!order)
        throw new apiError_1.ApiError(404, "Order not found.");
    const sellerSubtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const sellerDiscount = order.items.reduce((acc, item) => acc + (item.price * item.quantity * item.discount) / 100, 0);
    const sellerTotal = sellerSubtotal - sellerDiscount;
    return {
        ...order,
        sellerSubtotal: Number(sellerSubtotal.toFixed(2)),
        sellerDiscount: Number(sellerDiscount.toFixed(2)),
        sellerTotal: Number(sellerTotal.toFixed(2)),
    };
};
exports.getOrderService = getOrderService;
