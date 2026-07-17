import { addToCartInput, CartItem, CartResponse } from "@/types/cartTypes";
import api from "./axios";

export const addToCart = async (
  input: addToCartInput,
): Promise<MessageResponse> => {
  const res = await api.post("/cart/add", input);
  return res.data;
};

export const getAllCartItems = async (): Promise<CartResponse> => {
  const res = await api.get("/cart/all");
  return res.data.cart;
};

export const removeItemApi = async (
  productId: string,
): Promise<MessageResponse> => {
  const res = await api.delete(`/cart/remove/${productId}`);
  return res.data;
};

export const clearCartApi = async (): Promise<MessageResponse> => {
  const res = await api.delete("/cart/clear");
  return res.data;
};

export const updateCartApi = async (
  input: addToCartInput,
): Promise<MessageResponse> => {
  const res = await api.patch("/cart/update", input);
  return res.data;
};

export const mergeCart = async (
  items: addToCartInput[],
): Promise<MessageResponse> => {
  const res = await api.post("/cart/merge",  {items} );
  return res.data;
};
