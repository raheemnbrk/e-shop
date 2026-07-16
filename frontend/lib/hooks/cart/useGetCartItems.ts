import { getAllCartItems } from "@/lib/api/cartApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";

export const useGetCartItems = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["cart", user?.id],
    queryFn: getAllCartItems,
    enabled: !!user,
  });
};
