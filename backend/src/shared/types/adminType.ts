import z from "zod";
import {
  sellerQuerySchema,
  userQuerySchema,
} from "../validations/adminValidation";

export type userQueryInput = z.infer<typeof userQuerySchema>;

export type sellerQueryInput = z.infer<typeof sellerQuerySchema>;
