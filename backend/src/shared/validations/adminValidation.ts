import z from "zod";
import { Role, SellerStatus } from "../../generated/prisma";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export const searchQuerySchema = paginationSchema.extend({
  search: z.string().trim().optional(),
});

export const userQuerySchema = searchQuerySchema.extend({
  role: z.nativeEnum(Role).optional(),
});

export const sellerQuerySchema = searchQuerySchema.extend({
  status: z.nativeEnum(SellerStatus).optional(),
});

export const productQuerySchema = searchQuerySchema.extend({
  category: z.string().optional(),
  stock: z.enum(["all", "in", "low", "out"]).optional(),
  status: z.enum(["all", "available", "not available"]).optional(),
  sortBy: z.enum(["all", "newest", "oldest", "high", "low", "top"]).optional(),
  searchBy: z.enum(["product", "seller"]).optional(),
});
