import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const dashboardApi = async () => {
  const res = await axios.get("/api/dashboard/dashboard-stats");
  return res.data;
};

type UpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  role?: "admin" | "customer";
};

export const updateUserApi = async (id: string, data: UpdateUserPayload) => {
  const res = await axios.post("/api/dashboard/update-user", { id, ...data });
  return res.data;
};
