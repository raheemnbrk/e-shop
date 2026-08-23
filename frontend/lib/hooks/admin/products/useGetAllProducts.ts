import { getAdminProductsApi } from "@/lib/api/admin/productsApi";
import { productQueryInput } from "@/types/adminTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (input: productQueryInput) => {
  return useQuery({
    queryKey: ["products", input],
    queryFn: () => getAdminProductsApi(input),
  });
};
