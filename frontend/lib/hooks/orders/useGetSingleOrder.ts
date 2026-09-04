import { getSingleOrderApi } from "@/lib/api/ordersApi";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleOrder = (orderNumber: string) => {
  return useQuery({
    queryKey: ["order", orderNumber],
    queryFn: () => getSingleOrderApi(orderNumber),
  });
};
