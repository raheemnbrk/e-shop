"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allOrdersQuerySchema = exports.ordersQuerySchema = exports.placeOrderSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../../generated/prisma");
const adminValidation_1 = require("./adminValidation");
exports.placeOrderSchema = zod_1.default.object({
    addressId: zod_1.default.string().min(1, "address is required."),
    couponCode: zod_1.default.string().optional(),
    deliveryMethod: zod_1.default.enum(prisma_1.DeliveryMethod),
    paymentMethod: zod_1.default.enum(prisma_1.PaymentMethod),
    note: zod_1.default.string().optional(),
});
exports.ordersQuerySchema = adminValidation_1.searchQuerySchema.extend({
    status: zod_1.default.enum(prisma_1.OrderStatus).optional(),
});
exports.allOrdersQuerySchema = adminValidation_1.searchQuerySchema.extend({
    status: zod_1.default.nativeEnum(prisma_1.OrderStatus).optional(),
    paymentStatus: zod_1.default.enum(["PAID", "UNPAID"]).optional(),
    paymentMethod: zod_1.default.nativeEnum(prisma_1.PaymentMethod).optional(),
    sortBy: zod_1.default.enum(["oldest", "highest", "lowest"]).optional(),
    from: zod_1.default.string().optional(),
    to: zod_1.default.string().optional(),
});
