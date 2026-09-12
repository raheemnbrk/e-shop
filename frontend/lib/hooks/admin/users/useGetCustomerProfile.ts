import { getCustomerProfileApi } from "@/lib/api/admin/usersApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomerProfile = (userId: string) => {
  return useQuery({
    queryKey: ["customer-profile", userId],
    queryFn: () => getCustomerProfileApi(userId),
    enabled: !!userId,
  });
};
