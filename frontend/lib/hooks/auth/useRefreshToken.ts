import api from "@/lib/api/axios";
import { User } from "@/types/authTypes";

export const refreshToken = async (): Promise<{
  accessToken: string;
  user: User;
}> => {
  const res = await api.post("/auth/refresh");
  return res.data;
};
