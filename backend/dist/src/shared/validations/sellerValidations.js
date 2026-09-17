"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusSchema = exports.sellerCustomersQuerySchema = exports.updateSellerSchema = exports.updateProductSchema = exports.createProductSchema = exports.applySellerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const adminValidation_1 = require("./adminValidation");
exports.applySellerSchema = zod_1.default.object({
    storeName: zod_1.default
        .string()
        .min(1, "Store Name is required.")
        .min(3, "Store Name must contains at least 3 characters."),
    description: zod_1.default
        .string()
        .min(1, "Description is required.")
        .min(10, "Description must contains at least 10 characters."),
});
exports.createProductSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Product name is required."),
    description: zod_1.default
        .string()
        .min(1, "Product description is required.")
        .min(10, "Product name must be at least 10 characters."),
    price: zod_1.default
        .number({ error: "Price must be a number." })
        .positive("Price must be greater than 0."),
    stock: zod_1.default
        .number({ error: "Stock must be a number." })
        .int({ error: "Stock must be a whole number." })
        .positive("Stock must be greater than 0."),
    categoryId: zod_1.default.string().min(1, "Category is required."),
    available: zod_1.default.coerce.boolean(),
});
exports.updateProductSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(3, "name must at least contain 3 characters.")
        .optional(),
    description: zod_1.default
        .string()
        .min(10, "description must at least contain 10 characters.")
        .optional(),
    price: zod_1.default
        .number({ error: "price must be a number." })
        .positive("price must be greater than 0.")
        .optional(),
    stock: zod_1.default
        .number({ error: "stock must be a number." })
        .int({ error: "Stock must be a whole number." })
        .positive("Stock must be greater than 0.")
        .optional(),
    categoryId: zod_1.default.string().optional(),
    discount: zod_1.default.coerce.number().min(0).max(90).optional(),
    available: zod_1.default.coerce.boolean().optional(),
});
exports.updateSellerSchema = zod_1.default.object({
    storeName: zod_1.default
        .string()
        .min(3, "Store Name must contains at least 3 characters.")
        .optional(),
    description: zod_1.default
        .string()
        .min(10, "Description must contains at least 10 characters.")
        .optional(),
});
exports.sellerCustomersQuerySchema = adminValidation_1.searchQuerySchema.extend({
    customerType: zod_1.default.enum(["all", "new", "returning"]).default("all"),
    sortBy: zod_1.default
        .enum(["newest", "highest_spending", "most_orders", "latest_order"])
        .default("newest"),
});
exports.updateOrderStatusSchema = zod_1.default.object({
    status: zod_1.default.enum(["CONFIRMED", "PROCESSING"]),
});
