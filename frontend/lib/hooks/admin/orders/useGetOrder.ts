import { getOrderApi } from "@/lib/api/admin/ordersApi";
import { useQuery } from "@tanstack/react-query";

export const useGetOrder = (orderNumber: string) => {
  return useQuery({
    queryKey: ["admin-order", orderNumber],
    queryFn: () => getOrderApi(orderNumber),
  });
};
