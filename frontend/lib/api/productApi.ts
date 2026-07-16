import { addReviewInput, Product } from "@/types/productTypes";
import api from "./axios";

export const getAllProducts = async (
  search?: string,
  filter?: string,
  category?: string,
  minPrice?: string,
  maxPrice?: string,
): Promise<Product[]> => {
  const res = await api.get("/product/all", {
    params: { search, filter, category, minPrice, maxPrice },
  });
  return res.data.products;
};

export const getSingleProduct = async (slug: string): Promise<Product> => {
  const res = await api.get(`/product/${slug}`);
  return res.data.product;
};

export const getRelatedProducts = async (slug: string): Promise<Product[]> => {
  const res = await api.get(`/product/related/${slug}`);
  return res.data.relatedProducts;
};

export const addReviewApi = async (
  productId: string,
  input: addReviewInput,
): Promise<MessageResponse> => {
  const res = await api.post(`review/add/${productId}`, input);
  return res.data;
};
