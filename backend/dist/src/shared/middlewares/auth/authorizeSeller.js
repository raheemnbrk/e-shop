"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeSeller = void 0;
const apiError_1 = require("../../utils/apiError");
const prisma_1 = __importDefault(require("../../config/prisma"));
const authorizeSeller = async (req, res, next) => {
    try {
        const { user } = req;
        if (user.role !== "SELLER")
            throw new apiError_1.ApiError(401, "Access denied.");
        const seller = await prisma_1.default.seller.findUnique({
            where: { userId: user.id },
            select: { userId: true, status: true },
        });
        if (!seller)
            throw new apiError_1.ApiError(404, "Access denied");
        if (seller.status !== "APPROVED")
            throw new apiError_1.ApiError(403, "Access denied");
        req.seller = { id: seller.userId };
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authorizeSeller = authorizeSeller;
