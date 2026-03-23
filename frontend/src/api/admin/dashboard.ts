import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const dashboardApi = async () => {
  const res = await axios.get("/api/dashboard/dashboard-stats");
  return res.data;
};
