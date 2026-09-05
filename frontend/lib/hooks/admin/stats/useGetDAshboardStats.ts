import { getDashBoardStats } from "@/lib/api/admin/statsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetDashBoardStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getDashBoardStats,
  });
};
