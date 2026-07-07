import z from "zod";
import {
  applySellerSchema,
  createProductSchema,
  updateProductSchema,
} from "../validations/sellerValidations";

export type applySellerInput = z.infer<typeof applySellerSchema>;

export type createProductInput = z.infer<typeof createProductSchema>;

export type updateProductInput = z.infer<typeof updateProductSchema>;
