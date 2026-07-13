"use client";

import { getAllProducts } from "@/lib/api/productApi";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (
  search?: string,
  filter?: string,
  category?: string,
  minPrice?: string,
  maxPrice?: string,
) => {
  return useQuery({
    queryKey: ["products", search, filter , category , minPrice , maxPrice],
    queryFn: () => getAllProducts(search, filter , category , minPrice , maxPrice),
  });
};
