import { getMyOrders } from "@/lib/api/ordersApi";
import { myOrdersQueryInput } from "@/types/orderTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetMyOrders = ({ page, status }: myOrdersQueryInput) => {
  return useQuery({
    queryKey: ["orders", page, status],
    queryFn: () => getMyOrders({ page, status }),
  });
};
