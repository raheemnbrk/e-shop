import {
  sellerApplicationSchema,
  updateSellerSchema,
} from "@/lib/validators/seller.schema";
import z from "zod";

export type sellerApplicationInput = z.infer<typeof sellerApplicationSchema>;

export type updateSellerInput = z.infer<typeof updateSellerSchema>;
