"use client";

import { getAllProducts } from "@/lib/api/productApi";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (search?: string, filter?: string) => {
  return useQuery({
    queryKey: ["products" , search , filter],
    queryFn: ()=>getAllProducts(search , filter),
  });
};
