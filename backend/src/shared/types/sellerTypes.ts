import z from "zod";
import {
  applySellerSchema,
  createProductSchema,
} from "../validations/sellerValidations";

export type applySellerInput = z.infer<typeof applySellerSchema>;

export type createProductInput = z.infer<typeof createProductSchema>;
