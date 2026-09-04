import {
  myOrdersQueryInput,
  ordersResponse,
  placeOrderInput,
  placeOrderResponse,
  singleOrderResponse,
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

export const getSingleOrderApi = async (
  orderNumber: string,
): Promise<singleOrderResponse> => {
  const res = await api.get(`/orders/${orderNumber}`);
  return res.data;
};
