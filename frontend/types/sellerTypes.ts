import {
  createProductSchema,
  sellerApplicationSchema,
  updateProductSchema,
  updateSellerSchema,
} from "@/lib/validators/seller.schema";
import z from "zod";

export type applySellerInput = z.infer<typeof sellerApplicationSchema>;

export type updateSellerInput = z.infer<typeof updateSellerSchema>;

export type createProductInput = z.infer<typeof createProductSchema>;

export type updateProductInput = z.infer<typeof updateProductSchema>;
