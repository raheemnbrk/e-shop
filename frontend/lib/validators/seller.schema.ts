import z from "zod";

export const sellerApplicationSchema = z.object({
  storeName: z
    .string()
    .min(1, "Store name is required.")
    .min(3, "Store name must at least contains 3 characters."),
  storeSlug: z
    .string()
    .min(1, "Store slug is required.")
    .min(3, "Store slug must at least contains 3 characters."),
  description: z
    .string()
    .min(1, "description is required.")
    .min(10, "description must at least contains 10 characters."),
});
