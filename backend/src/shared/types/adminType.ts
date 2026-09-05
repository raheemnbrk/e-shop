import z from "zod";
import {
  dashboardPeriodSchema,
  productQuerySchema,
  sellerQuerySchema,
  userQuerySchema,
} from "../validations/adminValidation";

export type userQueryInput = z.infer<typeof userQuerySchema>;

export type sellerQueryInput = z.infer<typeof sellerQuerySchema>;

export type productQueryInput = z.infer<typeof productQuerySchema>;

export type dashboardPeriodInput = z.infer<typeof dashboardPeriodSchema>;
