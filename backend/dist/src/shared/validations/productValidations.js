"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productQuerySchema = void 0;
const zod_1 = __importDefault(require("zod"));
const adminValidation_1 = require("./adminValidation");
exports.productQuerySchema = adminValidation_1.searchQuerySchema.extend({
    category: zod_1.default.string().optional(),
    sortBy: zod_1.default.enum(["newest", "highest", "lowest", "discount"]).optional(),
    minPrice: zod_1.default.coerce.number().optional(),
    maxPrice: zod_1.default.coerce.number().optional(),
});
