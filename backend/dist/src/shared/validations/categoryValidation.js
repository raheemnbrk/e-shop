"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.addCategorySchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.addCategorySchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(1, "Category name is required.")
        .min(3, "Category name must be at least 3 characters."),
    parentId: zod_1.default.string().optional(),
});
exports.updateCategorySchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(3, "Category name must be at least 3 characters.")
        .optional(),
    parentId: zod_1.default.string().optional(),
});
