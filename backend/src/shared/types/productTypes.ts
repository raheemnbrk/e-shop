import z from "zod";
import { addReviewSchema } from "../validations/reviewValidations";
import { addToCartSchema } from "../validations/cartValidations";
import { productQuerySchema } from "../validations/productValidations";

export type productQuery = {
  search?: string;
  filter?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
};

export type addReviewInput = z.infer<typeof addReviewSchema>;

export type addToCartInput = z.infer<typeof addToCartSchema>;

export type productQueryInput = z.infer<typeof productQuerySchema>;
