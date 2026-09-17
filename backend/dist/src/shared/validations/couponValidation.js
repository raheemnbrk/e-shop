"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponQuerySchema = exports.updateCouponSchema = exports.createCouponSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../../generated/prisma");
const adminValidation_1 = require("./adminValidation");
exports.createCouponSchema = zod_1.default.object({
    code: zod_1.default
        .string()
        .min(3, "code must be at least 3 characters.")
        .max(20, "Code must be at most 20 characters")
        .toUpperCase(),
    discount: zod_1.default
        .number()
        .min(1, "Discount must be at least 1%")
        .max(90, "Discount must at most 90%"),
    type: zod_1.default.nativeEnum(prisma_1.CouponType).default("PERCENTAGE"),
    maxUses: zod_1.default.number().int().min(1).default(1).optional(),
    expiresAt: zod_1.default
        .string()
        .datetime()
        .refine((value) => new Date(value) > new Date(), "Expiration date must be in the future."),
    isActive: zod_1.default.boolean().default(true),
});
exports.updateCouponSchema = exports.createCouponSchema.partial();
exports.couponQuerySchema = adminValidation_1.searchQuerySchema.extend({
    search: zod_1.default.string().optional(),
    status: zod_1.default.enum(["active", "inactive"]).optional(),
    type: zod_1.default.nativeEnum(prisma_1.CouponType).optional(),
    sortBy: zod_1.default
        .enum(["newest", "oldest", "high discount", "low discount"])
        .optional(),
});
