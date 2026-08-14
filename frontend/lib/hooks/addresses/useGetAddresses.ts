import { getAddressApi } from "@/lib/api/addressApi";
import { useQuery } from "@tanstack/react-query";

export const useGetAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddressApi,
  });
};
