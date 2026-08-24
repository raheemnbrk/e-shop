import {
  couponQuerySchema,
  createCouponSchema,
  updateCouponSchema,
} from "@/lib/validators/couponSchema";
import z from "zod";

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "PERCENTAGE" | "FIXED";
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
}

export interface allCouponsResponse {
  success: boolean;
  coupons: Coupon[];
  pagination: Pagination;
}

export type couponQueryInput = z.infer<typeof couponQuerySchema>;

export type createCouponInput = z.infer<typeof createCouponSchema>;

export type updateCouponInput = z.infer<typeof updateCouponSchema>;
