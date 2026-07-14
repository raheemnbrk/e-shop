import z from "zod";

export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  quantity: z
    .number({ error: "Quantity must be a number." })
    .positive({ error: "Quantity must be positive" })
    .min(1, "Quantity must at least equals to 1."),
});
