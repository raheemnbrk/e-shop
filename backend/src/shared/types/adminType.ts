import z from "zod";
import {
  productQuerySchema,
  sellerQuerySchema,
  userQuerySchema,
} from "../validations/adminValidation";

export type userQueryInput = z.infer<typeof userQuerySchema>;

export type sellerQueryInput = z.infer<typeof sellerQuerySchema>;

export type productQueryInput = z.infer<typeof productQuerySchema>;
