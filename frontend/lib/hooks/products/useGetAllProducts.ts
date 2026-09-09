"use client";

import { getAllProducts } from "@/lib/api/productApi";
import { productQueryInput } from "@/types/productTypes";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetAllProducts = (input: Omit<productQueryInput, "page">) => {
  return useInfiniteQuery({
    queryKey: ["products", input],
    queryFn: ({ pageParam = 1 }) =>
      getAllProducts({ ...input, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined,
  });
};
