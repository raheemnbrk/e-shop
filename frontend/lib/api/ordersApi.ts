import {
  myOrdersQueryInput,
  ordersResponse,
  placeOrderInput,
  placeOrderResponse,
} from "@/types/orderTypes";
import api from "./axios";

export const placeOrderApi = async (
  input: placeOrderInput,
): Promise<placeOrderResponse> => {
  const res = await api.post("/orders/place-order", input);
  return res.data;
};

export const getMyOrders = async ({
  page,
  status,
}: myOrdersQueryInput): Promise<ordersResponse> => {
  const res = await api.get("/orders/my-orders", { params: { page, status } });
  return res.data;
};
