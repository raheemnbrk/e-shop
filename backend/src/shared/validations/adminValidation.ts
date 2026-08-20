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
