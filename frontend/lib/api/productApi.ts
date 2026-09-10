import {
  addReviewInput,
  allProductsResponse,
  homePageDataResponse,
  Product,
  productQueryInput,
} from "@/types/productTypes";
import api from "./axios";

export const getAllProducts = async (
  input: productQueryInput,
): Promise<allProductsResponse> => {
  const res = await api.get("/product/all", {
    params: input,
  });
  return res.data;
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

export const getHomePageDataApi = async (): Promise<homePageDataResponse> => {
  const res = await api.get("/product/home");
  return res.data;
};
