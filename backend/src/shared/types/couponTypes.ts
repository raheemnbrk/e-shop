import z from "zod";
import {
  couponQuerySchema,
  createCouponSchema,
  updateCouponSchema,
} from "../validations/couponValidation";

export type createCouponInput = z.infer<typeof createCouponSchema>;

export type updateCouponInput = z.infer<typeof updateCouponSchema>;

export type couponQueryInput = z.infer<typeof couponQuerySchema>;
