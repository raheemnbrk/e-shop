import {
  applySellerInput,
  createProductInput,
  sellerCustomersQueryInput,
  SellerCustomersResponse,
  sellerDashboardStatsResponse,
  sellerProfileResponse,
  updateProductInput,
  updateSellerInput,
} from "@/types/sellerTypes";
import api from "./axios";
import {
  allProductsResponse,
  DashboardPeriod,
  dashboardSalesStatsResponse,
  productQueryInput,
} from "@/types/adminTypes";
import { allOrderQueryInput, ordersResponse } from "@/types/orderTypes";

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

export const getSellerProductsApi = async (
  input: productQueryInput,
): Promise<allProductsResponse> => {
  const res = await api.get("/product/seller-products", { params: input });
  return res.data;
};

export const createProductApi = async (
  input: createProductInput,
  files: File[],
): Promise<MessageResponse> => {
  const formData = new FormData();

  formData.append("name", input.name);
  formData.append("price", String(input.price));
  formData.append("stock", String(input.stock));
  formData.append("description", input.description);
  formData.append("available", String(input.available));
  formData.append("categoryId", input.categoryId);

  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await api.post("/product/create-product", formData);

  return res.data;
};

export const updateProductApi = async (
  id: string,
  input: updateProductInput,
  files: File[],
): Promise<MessageResponse> => {
  const formData = new FormData();

  if (input.name) formData.append("name", input.name);
  if (input.price) formData.append("price", String(input.price));
  if (input.discount) formData.append("discount", String(input.discount));
  if (input.stock) formData.append("stock", String(input.stock));
  if (input.description) formData.append("description", input.description);
  if (input.available) formData.append("available", String(input.available));
  if (input.categoryId) formData.append("categoryId", input.categoryId);

  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await api.patch(`/product/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const deleteProductApi = async (
  id: string,
): Promise<MessageResponse> => {
  const res = await api.delete(`/product/delete/${id}`);
  return res.data;
};

export const toggleProductAvailabilityApi = async (
  id: string,
): Promise<MessageResponse> => {
  const res = await api.patch(`/product/toggle-availability/${id}`);
  return res.data;
};

export const getSellerOrdersApi = async (
  input: allOrderQueryInput,
): Promise<ordersResponse> => {
  const res = await api.get("/orders/seller/all", { params: input });
  return res.data;
};

export const getSellerCustomersApi = async (
  input: sellerCustomersQueryInput,
): Promise<SellerCustomersResponse> => {
  const res = await api.get("/seller/customers", { params: input });
  return res.data;
};

export const getSellerDashboardStats =
  async (): Promise<sellerDashboardStatsResponse> => {
    const res = await api.get("stats/seller");
    return res.data;
  };

export const getSellerSalesStats = async (
  period: DashboardPeriod,
): Promise<dashboardSalesStatsResponse> => {
  const res = await api.get("/stats/seller/sales", { params: { period } });
  return res.data;
};

export const getSellerProfileForAdminApi =
  async (slug : string): Promise<sellerProfileResponse> => {
    const res = await api.get(`/seller/admin/${slug}`);
    return res.data;
  };
