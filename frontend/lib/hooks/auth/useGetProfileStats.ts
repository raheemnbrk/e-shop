import { getProfileStatsApi } from "@/lib/api/authApi";
import { useQuery } from "@tanstack/react-query";

export const useGetProfileStats = () => {
  return useQuery({
    queryKey: ["profile-stats"],
    queryFn: getProfileStatsApi,
  });
};
