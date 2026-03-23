import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../api/admin/dashboard";
import { useEffect } from "react";
import { useDashboard } from "../../zustand/dashboard";
import toast from "react-hot-toast";

export const useDashboardQueries = () => {
  const setDashboardStats = useDashboard((state) => state.setDashboardStats);

  const getStats = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: dashboardApi,
  });

  const { data, isSuccess, isError } = getStats;

  useEffect(() => {
    if (isSuccess && data) {
      if (data.success) {
        setDashboardStats(data.dashboardStats);
      } else {
        toast.error(data?.message || "Failed to fetch stats");
      }
    }
  }, [isSuccess, data, setDashboardStats]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError]);

  return { getStats };
};
