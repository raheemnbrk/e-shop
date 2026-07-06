import z from "zod";
import { addCategorySchema } from "../validations/categoryValidation";

export type addCategoryInput = z.infer<typeof addCategorySchema>;
