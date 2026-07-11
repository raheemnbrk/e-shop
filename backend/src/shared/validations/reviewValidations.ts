import z from "zod";

export const addReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Review must be at least one star.")
    .max(5, "Review must be at most 5 stars."),
  comment: z.string().min(1, "Comment is required."),
});
