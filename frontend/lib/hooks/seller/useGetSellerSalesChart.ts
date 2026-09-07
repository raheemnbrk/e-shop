import { getSellerSalesStats } from "@/lib/api/sellerApi";
import { DashboardPeriod } from "@/types/adminTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetSellerSalesStats = (period: DashboardPeriod) => {
  return useQuery({
    queryKey: ["sales-stats", period],
    queryFn: () => getSellerSalesStats(period),
  });
};
