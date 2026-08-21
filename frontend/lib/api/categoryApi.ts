import {
  addCategoryInput,
  Category,
  updateCategoryInput,
} from "@/types/categoryTypes";
import api from "./axios";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/category/all");
  return res.data.categories;
};

export const addCategoryApi = async (
  input: addCategoryInput,
  file: File,
): Promise<MessageResponse> => {
  const formData = new FormData();

  formData.append("name", input.name);
  if (input.parentId) formData.append("parentId", input.parentId);

  formData.append("image", file);
  const res = await api.post("/category/create-category", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateCategoryApi = async (
  id: string,
  input: updateCategoryInput,
  file?: File,
) => {
  const formDate = new FormData();

  if (input.name) formDate.append("name", input.name);
  if (input.parentId) formDate.append("parentId", input.parentId);
  if (file) formDate.append("image", file);

  const res = await api.patch(`/category/update/${id}`, formDate, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
