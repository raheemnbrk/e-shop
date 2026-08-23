import { getSellerProductsApi } from "@/lib/api/sellerApi";
import { productQueryInput } from "@/types/adminTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetALlProducts = (input: productQueryInput) => {
  return useQuery({
    queryKey: ["products", input],
    queryFn: () => getSellerProductsApi(input),
  });
};
