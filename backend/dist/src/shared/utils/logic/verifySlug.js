"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.takenSlug = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const takenSlug = async (slug, table, excludeId) => {
    const notClause = excludeId ? { NOT: { id: excludeId } } : {};
    const notClauseSeller = excludeId ? { NOT: { userId: excludeId } } : {};
    const existing = table === "category"
        ? await prisma_1.default.category.findFirst({ where: { slug, ...notClause } })
        : table === "product"
            ? await prisma_1.default.product.findFirst({ where: { slug, ...notClause } })
            : await prisma_1.default.seller.findFirst({
                where: { storeSlug: slug, ...notClauseSeller },
            });
    return existing ? `${slug}-${Date.now()}` : slug;
};
exports.takenSlug = takenSlug;
