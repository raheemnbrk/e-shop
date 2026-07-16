import z from "zod";

export const addReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Review must be at least one star.")
    .max(5, "Review must be at most 5 stars."),
  comment: z.string().min(1, "Comment is required."),
});

export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  quantity: z
    .number({ error: "Quantity must be a number." })
    .positive({ error: "Quantity must be positive" })
    .min(1, "Quantity must at least equals to 1."),
});
