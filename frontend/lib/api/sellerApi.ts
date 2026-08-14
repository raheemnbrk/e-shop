import { sellerApplicationInput, updateSellerInput } from "@/types/sellerTypes";
import api from "./axios";

export const applySeller = async (input: sellerApplicationInput) => {
  const res = await api.post("/seller/apply", input);
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
