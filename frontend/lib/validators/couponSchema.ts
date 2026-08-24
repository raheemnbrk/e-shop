import z from "zod";
import { searchQuerySchema } from "./adminSchema";

export const couponQuerySchema = searchQuerySchema.extend({
  search: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  type: z.enum(["PERCENTAGE", "FIXED"]).optional(),
  sortBy: z
    .enum(["newest", "oldest", "high discount", "low discount"])
    .optional(),
});
