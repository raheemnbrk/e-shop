import { refreshAccessToken } from "@/lib/api/axios";
import { User } from "@/types/authTypes";

export const refreshToken = async (): Promise<{
  accessToken: string;
  user: User;
}> => {
  return refreshAccessToken() as Promise<{
    accessToken: string;
    user: User;
  }>;
};
