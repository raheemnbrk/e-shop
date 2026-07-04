import z from "zod";

export const applySellerSchema = z.object({
  storeName: z
    .string()
    .min(1, "Store Name is required.")
    .min(3, "Store Name must contains at least 3 characters."),
  storeSlug: z
    .string()
    .min(1, "Store slung is required.")
    .min(3, "Store slung must contain at least 3 characters."),
  description: z
    .string()
    .min(1, "Description is required.")
    .min(10, "Description must contains at least 10 characters."),
});
