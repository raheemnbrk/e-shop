import { allOrderQueryInput, ordersResponse } from "@/types/orderTypes";
import api from "../axios";

export const getAdminOrdersApi = async (
  input: allOrderQueryInput,
): Promise<ordersResponse> => {
  const res = await api.get("/orders/admin/all", { params: input });
  return res.data;
};
