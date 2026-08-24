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

export const createCouponSchema = z.object({
  code: z
    .string()
    .min(3, "code must be at least 3 characters.")
    .max(20, "Code must be at most 20 characters")
    .toUpperCase(),
  discount: z
    .number()
    .min(1, "Discount must be at least 1%")
    .max(90, "Discount must at most 90%"),
  type: z.enum(["PERCENTAGE", "FIXED"]).default("PERCENTAGE"),
  maxUses: z.number().int().min(1).default(1).optional(),
  expiresAt: z
    .string()
    .datetime()
    .refine(
      (value) => new Date(value) > new Date(),
      "Expiration date must be in the future.",
    ),
  isActive: z.boolean().default(true),
});

export const updateCouponSchema = createCouponSchema.partial();
