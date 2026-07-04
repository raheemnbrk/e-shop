import z from "zod";
import { applySellerSchema } from "../validations/sellerValidations";

export type applySellerInput = z.infer<typeof applySellerSchema>;
