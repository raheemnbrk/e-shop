"use client"

import { getCategories } from "@/lib/api/categoryApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 60 * 60 * 1000,
  });
};
