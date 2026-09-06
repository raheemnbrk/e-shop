import z from "zod";
import {
  applySellerSchema,
  createProductSchema,
  sellerCustomersQuerySchema,
  updateProductSchema,
  updateSellerSchema,
} from "../validations/sellerValidations";

export type applySellerInput = z.infer<typeof applySellerSchema>;

export type createProductInput = z.infer<typeof createProductSchema>;

export type updateProductInput = z.infer<typeof updateProductSchema>;

export type updateSellerInput = z.infer<typeof updateSellerSchema>;

export type sellerCustomersQueryInput = z.infer<
  typeof sellerCustomersQuerySchema
>;
