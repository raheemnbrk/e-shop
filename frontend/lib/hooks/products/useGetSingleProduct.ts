"use client"

import { getSingleProduct } from "@/lib/api/productApi";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getSingleProduct(slug),
  });
};
