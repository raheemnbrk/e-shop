"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeCartService = exports.updateCartService = exports.clearCartService = exports.removeItemFromCartService = exports.addToCartServices = exports.getCartService = exports.getOrCreateCart = void 0;
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const apiError_1 = require("../../shared/utils/apiError");
const getOrCreateCart = async (userId) => {
    let cart = await prisma_1.default.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            price: true,
                            stock: true,
                            available: true,
                            images: true,
                            discount: true,
                        },
                    },
                },
            },
        },
    });
    if (!cart) {
        cart = await prisma_1.default.cart.create({
            data: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                discount: true,
                                images: true,
                                stock: true,
                                available: true,
                                slug: true,
                            },
                        },
                    },
                },
            },
        });
    }
    return cart;
};
exports.getOrCreateCart = getOrCreateCart;
const getCartService = async (userId) => {
    const cart = await (0, exports.getOrCreateCart)(userId);
    return cart;
};
exports.getCartService = getCartService;
const addToCartServices = async (userId, input) => {
    const { productId, quantity } = input;
    const product = await prisma_1.default.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new apiError_1.ApiError(404, "Product not found.");
    if (!product.available)
        throw new apiError_1.ApiError(400, "Product is not available.");
    if (product.stock < quantity)
        throw new apiError_1.ApiError(400, "Not enough stock.");
    const cart = await (0, exports.getOrCreateCart)(userId);
    const existingItem = await prisma_1.default.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId } },
    });
    if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        await prisma_1.default.cartItem.update({
            where: { cartId_productId: { cartId: cart.id, productId } },
            data: { quantity: newQty },
        });
    }
    else {
        await prisma_1.default.cartItem.create({
            data: { cartId: cart.id, productId, quantity },
        });
    }
    return { message: "Product added to cart." };
};
exports.addToCartServices = addToCartServices;
const removeItemFromCartService = async (userId, productId) => {
    const product = await prisma_1.default.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new apiError_1.ApiError(404, "Product now found.");
    const cart = await (0, exports.getOrCreateCart)(userId);
    await prisma_1.default.cartItem.delete({
        where: { cartId_productId: { cartId: cart.id, productId } },
    });
    return { message: "Items deleted successfully." };
};
exports.removeItemFromCartService = removeItemFromCartService;
const clearCartService = async (userId) => {
    const cart = await prisma_1.default.cart.findUnique({ where: { userId } });
    if (!cart)
        throw new apiError_1.ApiError(404, "Cart not found.");
    await prisma_1.default.cart.deleteMany({ where: { id: cart.id } });
    return { message: "Cart Cleared successfully." };
};
exports.clearCartService = clearCartService;
const updateCartService = async (userId, input) => {
    const { productId, quantity } = input;
    if (quantity < 1)
        throw new apiError_1.ApiError(400, "Quantity must be at least 1.");
    const product = await prisma_1.default.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new apiError_1.ApiError(404, "Product not found.");
    if (product.stock < quantity)
        throw new apiError_1.ApiError(400, "Not enough stock.");
    const cart = await prisma_1.default.cart.findUnique({ where: { userId } });
    if (!cart)
        throw new apiError_1.ApiError(404, "Cart not found.");
    const item = await prisma_1.default.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId } },
    });
    if (!item)
        throw new apiError_1.ApiError(404, "Item not found in cart.");
    await prisma_1.default.cartItem.update({
        where: { cartId_productId: { cartId: cart.id, productId } },
        data: { quantity },
    });
    return { message: "Cart updated Successfully." };
};
exports.updateCartService = updateCartService;
const mergeCartService = async (userId, items) => {
    const cart = await (0, exports.getOrCreateCart)(userId);
    for (const item of items) {
        const product = await prisma_1.default.product.findUnique({
            where: { id: item.productId },
        });
        if (!product || !product.available)
            continue;
        const existing = await prisma_1.default.cartItem.findUnique({
            where: {
                cartId_productId: { cartId: cart.id, productId: item.productId },
            },
        });
        if (existing) {
            const newQty = Math.min(existing.quantity + item.quantity, product.stock);
            await prisma_1.default.cartItem.update({
                where: {
                    cartId_productId: { cartId: cart.id, productId: item.productId },
                },
                data: { quantity: newQty },
            });
        }
        else {
            const qty = Math.min(item.quantity, product.stock);
            await prisma_1.default.cartItem.create({
                data: { cartId: cart.id, productId: item.productId, quantity: qty },
            });
        }
    }
    return { message: "Cart merged successfully." };
};
exports.mergeCartService = mergeCartService;
