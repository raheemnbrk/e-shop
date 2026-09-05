import {
  DashboardPeriod,
  dashboardSalesStatsResponse,
  dashboardStatsResponse,
} from "@/types/adminTypes";
import api from "../axios";

export const getDashBoardStats = async (): Promise<dashboardStatsResponse> => {
  const res = await api.get("/stats/dashboard");
  return res.data;
};
export const getDashBoardSalesStats = async (
  period: DashboardPeriod,
): Promise<dashboardSalesStatsResponse> => {
  const res = await api.get("/stats/dashboard/sales", { params: { period } });
  return res.data;
};
