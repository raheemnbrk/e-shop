import { allCouponsResponse, couponQueryInput } from "@/types/couponTypes";
import api from "../axios";

export const getAllCouponsApi = async (
  input: couponQueryInput,
): Promise<allCouponsResponse> => {
  const res = await api.get("/coupon/all", { params:  input  });
  return res.data;
};
