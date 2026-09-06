import { getSellerCustomersApi } from "@/lib/api/sellerApi";
import { sellerCustomersQueryInput } from "@/types/sellerTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetSellerCustomers = (input: sellerCustomersQueryInput) => {
  return useQuery({
    queryKey: ["seller-customers", input],
    queryFn: () => getSellerCustomersApi(input),
  });
};
