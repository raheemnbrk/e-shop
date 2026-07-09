import { sellerApplicationSchema } from "@/lib/validators/seller.schema";
import z from "zod";

export type sellerApplicationInput = z.infer<typeof sellerApplicationSchema>;
