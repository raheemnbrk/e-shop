import { getAllCouponsApi } from "@/lib/api/admin/couponApi";
import { couponQueryInput } from "@/types/couponTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = (input: couponQueryInput) => {
  return useQuery({
    queryKey: ["coupons", input],
    queryFn: () => getAllCouponsApi(input),
  });
};
