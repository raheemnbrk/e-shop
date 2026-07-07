import z from "zod";
import {
  addCategorySchema,
  updateCategorySchema,
} from "../validations/categoryValidation";

export type addCategoryInput = z.infer<typeof addCategorySchema>;

export type updateCategoryInput = z.infer<typeof updateCategorySchema>;
