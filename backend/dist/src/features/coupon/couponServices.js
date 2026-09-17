"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCouponService = exports.getALlCouponsService = exports.toggleCouponService = exports.updateCouponService = exports.createCouponService = void 0;
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const apiError_1 = require("../../shared/utils/apiError");
const createCouponService = async (input) => {
    const existing = await prisma_1.default.coupon.findFirst({
        where: { code: input.code },
    });
    if (existing)
        throw new apiError_1.ApiError(400, "Coupon is already existing");
    await prisma_1.default.coupon.create({
        data: {
            code: input.code,
            discount: input.discount,
            expiresAt: input.expiresAt,
            maxUses: input.maxUses,
            type: input.type,
            isActive: input.isActive,
        },
    });
    return { message: "Coupon created successfully." };
};
exports.createCouponService = createCouponService;
const updateCouponService = async (id, input) => {
    const coupon = await prisma_1.default.coupon.findUnique({
        where: { id },
    });
    if (!coupon)
        throw new apiError_1.ApiError(404, "Coupon not found");
    await prisma_1.default.coupon.update({ where: { id }, data: { ...input } });
    return { message: "Coupon updated successfully." };
};
exports.updateCouponService = updateCouponService;
const toggleCouponService = async (id) => {
    const coupon = await prisma_1.default.coupon.findUnique({ where: { id } });
    if (!coupon)
        throw new apiError_1.ApiError(404, "Coupon not found.");
    await prisma_1.default.coupon.update({
        where: { id },
        data: { isActive: !coupon.isActive },
    });
    return {
        message: `Coupon is ${coupon.isActive ? "deactivated" : "activated"} successfully.`,
    };
};
exports.toggleCouponService = toggleCouponService;
const getALlCouponsService = async (input) => {
    const { page, search, sortBy, status, type } = input;
    const limit = 10;
    const skip = (page - 1) * limit;
    const where = {
        ...(search && { code: { contains: search, mode: "insensitive" } }),
        ...(status && status === "active" && { isActive: true }),
        ...(status && status === "inactive" && { isActive: false }),
        ...(type && type === "FIXED" && { type: "FIXED" }),
        ...(type && type === "PERCENTAGE" && { type: "PERCENTAGE" }),
    };
    const orderBy = sortBy === "oldest"
        ? { createdAt: "asc" }
        : sortBy === "high discount"
            ? { discount: "desc" }
            : sortBy === "low discount"
                ? { discount: "asc" }
                : { createdAt: "desc" };
    const [coupons, total] = await Promise.all([
        prisma_1.default.coupon.findMany({ where, orderBy, skip, take: limit }),
        prisma_1.default.coupon.count({ where }),
    ]);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return {
        coupons,
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
exports.getALlCouponsService = getALlCouponsService;
const deleteCouponService = async (id) => {
    const coupon = await prisma_1.default.coupon.findUnique({ where: { id } });
    if (!coupon)
        throw new apiError_1.ApiError(404, "Coupon not found.");
    await prisma_1.default.coupon.delete({ where: { id } });
    return { message: "Coupon is deleted successfully." };
};
exports.deleteCouponService = deleteCouponService;
