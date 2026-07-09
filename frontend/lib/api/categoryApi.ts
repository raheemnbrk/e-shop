import { Category } from "@/types/categoryTypes";
import api from "./axios";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/category/all");
  return res.data.categories;
};
