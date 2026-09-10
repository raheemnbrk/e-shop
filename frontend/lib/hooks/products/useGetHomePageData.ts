import { getHomePageDataApi } from "@/lib/api/productApi";
import { useQuery } from "@tanstack/react-query";

export const useGetHomePageData = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHomePageDataApi,
  });
};
