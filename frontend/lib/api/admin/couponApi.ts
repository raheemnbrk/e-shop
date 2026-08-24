import {
  allCouponsResponse,
  couponQueryInput,
  createCouponInput,
  updateCouponInput,
} from "@/types/couponTypes";
import api from "../axios";

export const getAllCouponsApi = async (
  input: couponQueryInput,
): Promise<allCouponsResponse> => {
  const res = await api.get("/coupon/all", { params: input });
  return res.data;
};

export const createCouponApi = async (
  input: createCouponInput,
): Promise<MessageResponse> => {
  const res = await api.post("/coupon/create", input);
  return res.data;
};

export const updateCouponApi = async (
  id: string,
  input: updateCouponInput,
): Promise<MessageResponse> => {
  const res = await api.patch(`/coupon/update/${id}`, input);
  return res.data;
};

export const toggleCouponApi = async (id: string): Promise<MessageResponse> => {
  const res = await api.patch(`/coupon/toggle/${id}`);
  return res.data;
};

export const deleteCouponApi = async (id: string): Promise<MessageResponse> => {
  const res = await api.delete(`/coupon/delete/${id}`);
  return res.data;
};
