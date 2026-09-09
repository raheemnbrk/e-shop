import z from "zod";
import { searchQuerySchema } from "./adminValidation";

export const productQuerySchema = searchQuerySchema.extend({
  category: z.string().optional(),
  sortBy: z.enum(["newest", "highest", "lowest", "discount"]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});
