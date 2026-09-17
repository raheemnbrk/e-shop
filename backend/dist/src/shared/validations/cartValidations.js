"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.addToCartSchema = zod_1.default.object({
    productId: zod_1.default.string().min(1, "Product is required."),
    quantity: zod_1.default
        .number({ error: "Quantity must be a number." })
        .positive({ error: "Quantity must be positive" })
        .min(1, "Quantity must at least equals to 1."),
});
