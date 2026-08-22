import z from "zod";

export const applySellerSchema = z.object({
  storeName: z
    .string()
    .min(1, "Store Name is required.")
    .min(3, "Store Name must contains at least 3 characters."),
  description: z
    .string()
    .min(1, "Description is required.")
    .min(10, "Description must contains at least 10 characters."),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  description: z
    .string()
    .min(1, "Product description is required.")
    .min(10, "Product name must be at least 10 characters."),
  price: z
    .number({ error: "Price must be a number." })
    .positive("Price must be greater than 0."),
  stock: z
    .number({ error: "Stock must be a number." })
    .int({ error: "Stock must be a whole number." })
    .positive("Stock must be greater than 0."),
  categoryId: z.string().min(1, "Category is required."),
  available: z.coerce.boolean(),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(3, "name must at least contain 3 characters.")
    .optional(),
  description: z
    .string()
    .min(10, "description must at least contain 10 characters.")
    .optional(),
  price: z
    .number({ error: "price must be a number." })
    .positive("price must be greater than 0.")
    .optional(),
  stock: z
    .number({ error: "stock must be a number." })
    .int({ error: "Stock must be a whole number." })
    .positive("Stock must be greater than 0.")
    .optional(),
  categoryId: z.string().optional(),
  discount: z.coerce.number().min(0).max(90).optional(),
  available: z.coerce.boolean().optional(),
});

export const updateSellerSchema = z.object({
  storeName: z
    .string()
    .min(3, "Store Name must contains at least 3 characters.")
    .optional(),
  description: z
    .string()
    .min(10, "Description must contains at least 10 characters.")
    .optional(),
});
