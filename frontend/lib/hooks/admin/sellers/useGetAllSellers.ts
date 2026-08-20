import { getALlSellersApi } from "@/lib/api/admin/sellersApi";
import { sellerQueryInput } from "@/types/adminTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSellers = ({
  page,
  status,
  search,
}: sellerQueryInput) => {

  return useQuery({
    queryKey: ["sellers", page, status, search],
    queryFn: () => getALlSellersApi({ search, page, status }),
  });
};
