import { getSellerProfileForAdminApi } from "@/lib/api/sellerApi";
import { useQuery } from "@tanstack/react-query";

export const useGetSellerProfile = (slug: string) => {
  return useQuery({
    queryKey: ["seller", slug],
    queryFn: () => getSellerProfileForAdminApi(slug),
  });
};
