import { allProductsResponse, productQueryInput } from "@/types/adminTypes";
import api from "../axios";

export const getAdminProductsApi = async (
  input: productQueryInput,
): Promise<allProductsResponse> => {
  const res = await api.get("/product/admin-products", { params: input });
  return res.data;
};

export const deleteProductApi = async (
  id: string,
): Promise<MessageResponse> => {
  const res = await api.delete(`/product/admin-delete/${id}`);
  return res.data;
};
