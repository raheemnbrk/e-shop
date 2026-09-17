"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderInvoiceController = exports.getSellerOrdersController = exports.adminCancelOrderController = exports.cancelOrderController = exports.getAdminOrdersController = exports.getMySingleOrderController = exports.getMyOrdersController = exports.stripeWebhookController = exports.placeOrderController = void 0;
const orderValidation_1 = require("../../shared/validations/orderValidation");
const orderServices = __importStar(require("./orderServices"));
const stripe_1 = __importDefault(require("../../shared/config/stripe"));
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const emailActions_1 = require("../../shared/utils/emails/emailActions");
const placeOrderController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const input = orderValidation_1.placeOrderSchema.parse(req.body);
        const result = await orderServices.placeOrderService(userId, input);
        return res.status(201).json({ success: true, ...result });
    }
    catch (err) {
        next(err);
    }
};
exports.placeOrderController = placeOrderController;
const stripeWebhookController = async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (!signature) {
        return res.status(400).json({
            message: "Missing Stripe signature.",
        });
    }
    let event;
    try {
        event = stripe_1.default.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (error) {
        console.error("Stripe webhook signature verification failed:", error);
        return res.status(400).json({
            message: "Invalid Stripe signature.",
        });
    }
    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const orderId = session.metadata?.orderId;
            if (!orderId) {
                console.error("No orderId in Stripe session metadata.");
                return res.status(400).json({
                    message: "Order ID missing.",
                });
            }
            const order = await prisma_1.default.order.findUnique({
                where: {
                    id: orderId,
                },
                include: {
                    user: true,
                    items: true,
                },
            });
            if (!order) {
                console.error(`Order ${orderId} not found.`);
                return res.status(404).json({
                    message: "Order not found.",
                });
            }
            if (order.paymentStatus === "PAID") {
                return res.status(200).json({
                    received: true,
                });
            }
            if (session.payment_status !== "paid") {
                return res.status(200).json({
                    received: true,
                });
            }
            const paymentIntentId = typeof session.payment_intent === "string"
                ? session.payment_intent
                : null;
            await prisma_1.default.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    paymentStatus: "PAID",
                    status: "CONFIRMED",
                    ...(paymentIntentId && {
                        paymentIntentId,
                    }),
                },
            });
            await (0, emailActions_1.sendOrderConfirmationEmail)(order.user.email, order.user.firstName, order.orderNumber, order.items, order.subtotal, order.discount, order.shippingCost, order.total, order.deliveryMethod);
            return res.status(200).json({
                received: true,
            });
        }
        if (event.type === "checkout.session.expired") {
            const session = event.data.object;
            const orderId = session.metadata?.orderId;
            if (!orderId) {
                return res.status(200).json({
                    received: true,
                });
            }
            const order = await prisma_1.default.order.findUnique({
                where: {
                    id: orderId,
                },
                include: {
                    items: true,
                },
            });
            if (!order) {
                return res.status(200).json({
                    received: true,
                });
            }
            if (order.paymentStatus === "PAID") {
                return res.status(200).json({
                    received: true,
                });
            }
            await prisma_1.default.$transaction(async (tx) => {
                await tx.order.update({
                    where: {
                        id: order.id,
                    },
                    data: {
                        status: "CANCELLED",
                    },
                });
                for (const item of order.items) {
                    if (!item.productId) {
                        continue;
                    }
                    await tx.product.update({
                        where: {
                            id: item.productId,
                        },
                        data: {
                            stock: {
                                increment: item.quantity,
                            },
                        },
                    });
                }
            });
            return res.status(200).json({
                received: true,
            });
        }
        return res.status(200).json({
            received: true,
        });
    }
    catch (error) {
        console.error("Stripe webhook processing error:", error);
        return res.status(500).json({
            message: "Webhook processing failed.",
        });
    }
};
exports.stripeWebhookController = stripeWebhookController;
const getMyOrdersController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const input = orderValidation_1.ordersQuerySchema.parse(req.query);
        const { orders, statusCounts, totalOrders, pagination } = await orderServices.getMyOrdersService(userId, input);
        return res
            .status(200)
            .json({ success: true, orders, statusCounts, totalOrders, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getMyOrdersController = getMyOrdersController;
const getMySingleOrderController = async (req, res, next) => {
    try {
        const { orderNumber } = req.params;
        const userId = req.user.id;
        const order = await orderServices.getMySingleOrderService(orderNumber, userId);
        return res.status(200).json({ success: true, order });
    }
    catch (err) {
        next(err);
    }
};
exports.getMySingleOrderController = getMySingleOrderController;
const getAdminOrdersController = async (req, res, next) => {
    try {
        const input = req.query;
        const { orders, pagination } = await orderServices.getAdminOrdersService(input);
        return res.status(200).json({ success: true, orders, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getAdminOrdersController = getAdminOrdersController;
const cancelOrderController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { message } = await orderServices.cancelOrderService(id, userId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.cancelOrderController = cancelOrderController;
const adminCancelOrderController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { message } = await orderServices.adminCancelOrderService(id);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.adminCancelOrderController = adminCancelOrderController;
const getSellerOrdersController = async (req, res, next) => {
    try {
        const sellerId = req.seller.id;
        const input = orderValidation_1.allOrdersQuerySchema.parse(req.query);
        const { orders, pagination } = await orderServices.getSellerOrdersService(sellerId, input);
        return res.status(200).json({ success: true, orders, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getSellerOrdersController = getSellerOrdersController;
const getOrderInvoiceController = async (req, res, next) => {
    try {
        const { orderNumber } = req.params;
        const userId = req.user.id;
        const doc = await orderServices.generateOrderInvoiceService(orderNumber, userId);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="invoice-${orderNumber}.pdf"`);
        doc.pipe(res);
        doc.end();
    }
    catch (error) {
        next(error);
    }
};
exports.getOrderInvoiceController = getOrderInvoiceController;
