import { allSellersResponse, sellerQueryInput } from "@/types/adminTypes";
import api from "../axios";

export const getALlSellersApi = async ({
  page,
  search,
  status,
}: sellerQueryInput): Promise<allSellersResponse> => {
  const res = await api.get("/admin/sellers", {
    params: { page, search, status },
  });
  return res.data;
};

export const approveSeller = async (id: string): Promise<MessageResponse> => {
  const res = await api.patch(`/admin/approve/${id}`);
  return res.data;
};

export const rejectSeller = async (id: string): Promise<MessageResponse> => {
  const res = await api.patch(`/admin/reject/${id}`);
  return res.data;
};
