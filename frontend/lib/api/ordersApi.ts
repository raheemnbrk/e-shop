import { placeOrderInput, placeOrderResponse } from "@/types/orderTypes";
import api from "./axios";

export const placeOrderApi = async (
  input: placeOrderInput,
): Promise<placeOrderResponse> => {
  const res = await api.post("/orders/place-order", input);
  return res.data;
};
