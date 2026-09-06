import { getSellerOrdersApi } from "@/lib/api/sellerApi";
import { allOrderQueryInput } from "@/types/orderTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetSellerOrders = (input: allOrderQueryInput) => {
  return useQuery({
    queryKey: ["seller-orders", input],
    queryFn: () => getSellerOrdersApi(input),
  });
};
