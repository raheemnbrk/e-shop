import z from "zod";

export const addCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required.")
    .min(3, "Category name must be at least 3 characters."),
  parentId: z.string().optional(),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters.")
    .optional(),
  parentId: z.string().optional(),
});
