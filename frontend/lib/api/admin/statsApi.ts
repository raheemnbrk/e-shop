import { dashboardStatsResponse } from "@/types/adminTypes";
import api from "../axios";

export const getDashBoardStats = async (): Promise<dashboardStatsResponse> => {
  const res = await api.get("/stats/dashboard");
  return res.data;
};
