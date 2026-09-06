import z from "zod";
import { searchQuerySchema } from "./adminSchema";

export const sellerApplicationSchema = z.object({
  storeName: z
    .string()
    .min(1, "Store name is required.")
    .min(3, "Store name must at least contains 3 characters."),
  description: z
    .string()
    .min(1, "description is required.")
    .min(10, "description must at least contains 10 characters."),
});

export const updateSellerSchema = z.object({
  storeName: z
    .string()
    .min(3, "Store name must at least contains 3 characters.")
    .optional(),
  description: z
    .string()
    .min(10, "description must at least contains 10 characters.")
    .optional(),
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
  discount: z.coerce
    .number()
    .min(0, "Discount must be a positive number.")
    .max(90, "Discount must not be above 90%")
    .optional(),
  available: z.coerce.boolean().optional(),
});

export const sellerCustomersQuerySchema = searchQuerySchema.extend({
  customerType: z.enum(["all", "new", "returning"]).default("all"),
  sortBy: z
    .enum(["newest", "highest_spending", "most_orders", "latest_order"])
    .default("newest"),
});
