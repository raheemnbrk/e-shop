"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReviewSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.addReviewSchema = zod_1.default.object({
    rating: zod_1.default
        .number()
        .min(1, "Review must be at least one star.")
        .max(5, "Review must be at most 5 stars."),
    comment: zod_1.default.string().min(1, "Comment is required."),
});
