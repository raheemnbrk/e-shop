"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReviewServices = void 0;
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const apiError_1 = require("../../shared/utils/apiError");
const addReviewServices = async (userId, productId, input) => {
    const product = await prisma_1.default.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new apiError_1.ApiError(404, "Product not found.");
    const existingReview = await prisma_1.default.review.findFirst({
        where: { userId, productId },
    });
    if (existingReview)
        throw new apiError_1.ApiError(404, "You already reviewed this product.");
    await prisma_1.default.review.create({
        data: { ...input, userId, productId },
    });
    return { message: "Review submitted successfully." };
};
exports.addReviewServices = addReviewServices;
