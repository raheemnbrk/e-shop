import z from "zod";
import { addReviewSchema } from "../validations/reviewValidations";

export type productQuery = {
  search?: string;
  filter?: string;
  category?: string,
  minPrice?: string,
  maxPrice?: string,
};

export type addReviewInput = z.infer<typeof addReviewSchema>;
