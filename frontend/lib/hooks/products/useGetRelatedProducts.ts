import { getRelatedProducts } from "@/lib/api/productApi";
import { useQuery } from "@tanstack/react-query";

export const useGetRelatedProducts = (slug: string) => {
  return useQuery({
    queryKey: ["related-products", slug],
    queryFn: () => getRelatedProducts(slug),
  });
};
