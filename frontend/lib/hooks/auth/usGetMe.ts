import { getMe } from "@/lib/api/authApi";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
