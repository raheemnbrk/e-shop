import z from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export const searchQuerySchema = paginationSchema.extend({
  search: z.string().trim().optional(),
});

export const userQuerySchema = searchQuerySchema.extend({
  role: z.enum(["ADMIN", "CUSTOMER", "SELLER"]).optional(),
});

export const sellerQuerySchema = searchQuerySchema.extend({
  status: z.enum(["PENDING" , "REJECTED" , "APPROVED"]).optional(),
});
