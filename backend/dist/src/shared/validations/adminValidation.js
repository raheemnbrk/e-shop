"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusSchema = exports.dashboardPeriodSchema = exports.productQuerySchema = exports.sellerQuerySchema = exports.userQuerySchema = exports.searchQuerySchema = exports.paginationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../../generated/prisma");
exports.paginationSchema = zod_1.default.object({
    page: zod_1.default.coerce.number().int().min(1).default(1),
});
exports.searchQuerySchema = exports.paginationSchema.extend({
    search: zod_1.default.string().trim().optional(),
});
exports.userQuerySchema = exports.searchQuerySchema.extend({
    role: zod_1.default.nativeEnum(prisma_1.Role).optional(),
});
exports.sellerQuerySchema = exports.searchQuerySchema.extend({
    status: zod_1.default.nativeEnum(prisma_1.SellerStatus).optional(),
});
exports.productQuerySchema = exports.searchQuerySchema.extend({
    category: zod_1.default.string().optional(),
    stock: zod_1.default.enum(["all", "in", "low", "out"]).optional(),
    status: zod_1.default.enum(["all", "available", "not available"]).optional(),
    sortBy: zod_1.default.enum(["all", "newest", "oldest", "high", "low", "top"]).optional(),
    searchBy: zod_1.default.enum(["product", "seller"]).optional(),
});
exports.dashboardPeriodSchema = zod_1.default.object({
    period: zod_1.default.enum(["7d", "30d", "12m"]).default("30d"),
});
exports.updateOrderStatusSchema = zod_1.default.object({
    status: zod_1.default.enum(["DELIVERED", "SHIPPED"]),
});
