import { Product } from "@/types/productTypes";
import api from "./axios";

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await api.get("/product/all");
  return res.data.products;
};

export const getSingleProduct = async (slug: string): Promise<Product> => {
  const res = await api.get(`/product/${slug}`);
  return res.data.product;
};
