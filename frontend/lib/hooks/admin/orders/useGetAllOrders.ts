import { getAdminOrdersApi } from "@/lib/api/admin/ordersApi";
import { allOrderQueryInput } from "@/types/orderTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetAllOrders = (input: allOrderQueryInput) => {
  return useQuery({
    queryKey: ["orders", input],
    queryFn: () => getAdminOrdersApi(input),
  });
};
