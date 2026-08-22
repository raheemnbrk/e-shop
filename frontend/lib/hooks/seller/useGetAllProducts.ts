import { getSellerProductsApi } from "@/lib/api/sellerApi";
import { productQueryInput } from "@/types/adminTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetALlProducts = (input: productQueryInput) => {
  return useQuery({
    queryKey: ["seller-products", input],
    queryFn: () => getSellerProductsApi(input),
  });
};
