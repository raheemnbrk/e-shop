import { getDashBoardSalesStats } from "@/lib/api/admin/statsApi";
import { DashboardPeriod } from "@/types/adminTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetDashBoardStats = (period: DashboardPeriod) => {
  return useQuery({
    queryKey: ["sales-stats", period],
    queryFn: () => getDashBoardSalesStats(period),
  });
};
