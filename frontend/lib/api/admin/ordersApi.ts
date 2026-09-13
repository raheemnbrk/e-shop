import { allOrderQueryInput, Order, ordersResponse } from "@/types/orderTypes";
import api from "../axios";
import { updateOrderStatusInput } from "@/types/adminTypes";

export const getAdminOrdersApi = async (
  input: allOrderQueryInput,
): Promise<ordersResponse> => {
  const res = await api.get("/orders/admin/all", { params: input });
  return res.data;
};

export const cancelOrderApi = async (id: string): Promise<MessageResponse> => {
  const res = await api.patch(`/orders/admin/cancel/${id}`);
  return res.data;
};

export const updateOrderStatusApi = async (
  id: string,
  input: updateOrderStatusInput,
): Promise<MessageResponse> => {
  const res = await api.patch(`/admin/orders/update-status/${id}`, input);
  return res.data;
};

export const getOrderApi = async (orderNumber: string): Promise<Order> => {
  const res = await api.get(`/admin/orders/${orderNumber}`);
  return res.data.order;
};
