import { getSellerOrderApi } from "@/lib/api/sellerApi";
import { useQuery } from "@tanstack/react-query";

export const useGetOrder = (orderNumber: string) => {
  return useQuery({
    queryKey: ["order", orderNumber],
    queryFn: () => getSellerOrderApi(orderNumber),
  });
};
