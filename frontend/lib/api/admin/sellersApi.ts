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
