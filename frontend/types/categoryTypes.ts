import {
  addCategorySchema,
  updateCategorySchema,
} from "@/lib/validators/categorySchema";
import z from "zod";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  parentId: string;
  productCount: number;
  children: Category[];
}

export type addCategoryInput = z.infer<typeof addCategorySchema>;

export type updateCategoryInput = z.infer<typeof updateCategorySchema>;
