import { getCategoryBySlugApi } from "@/lib/api/categoryApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["single-category", slug],
    queryFn: () => getCategoryBySlugApi(slug),
  });
};
