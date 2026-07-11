import api from "@/lib/api/axios";

export const refreshToken = async (): Promise<{ accessToken: string }> => {
  const res = await api.post("/auth/refresh");
  return res.data;
};