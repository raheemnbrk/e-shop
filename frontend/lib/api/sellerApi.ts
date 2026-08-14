import { applySellerInput, updateSellerInput } from "@/types/sellerTypes";
import api from "./axios";

export const applySellerApi = async (input: applySellerInput, file: File) => {
  const formData = new FormData();

  formData.append("storeName", input.storeName);
  formData.append("description", input.description);
  formData.append("logo", file);

  const res = await api.post("/seller/apply", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateSellerApi = async (
  input: updateSellerInput,
  file?: File,
) => {
  const formData = new FormData();

  if (input.storeName) formData.append("storeName", input.storeName);
  if (input.description) formData.append("description", input.description);

  if (file) formData.append("logo", file);

  const res = await api.patch("/seller/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
