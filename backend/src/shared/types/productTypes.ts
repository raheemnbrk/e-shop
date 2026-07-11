import z from "zod";
import { addReviewSchema } from "../validations/reviewValidations";

export type productQuery = {
  search?: string;
  filter?: string;
};

export type addReviewInput = z.infer<typeof addReviewSchema>;
