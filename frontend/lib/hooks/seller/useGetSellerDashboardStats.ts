import { getSellerDashboardStats } from "@/lib/api/sellerApi";
import { useQuery } from "@tanstack/react-query";

export const useGetSellerDashboardStats = () => {
  return useQuery({
    queryKey: ["seller-stats"],
    queryFn: getSellerDashboardStats,
  });
};
