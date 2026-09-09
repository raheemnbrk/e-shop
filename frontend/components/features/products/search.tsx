"use client";

import { Input } from "@/components/ui/input";
import { SelectDemo, SelectItemType } from "../layout/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { X } from "lucide-react";

const items: SelectItemType[] = [
  { label: "All products", value: "newest" },
  { label: "Price: low to high", value: "lowest" },
  { label: "Price: high to low", value: "highest" },
  { label: "Most discounted", value: "discount" },
]

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(name, value);
      else params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    router.push(`${pathname}?${createQueryString("search", value)}`);
  }, 400);

  const handleFilter = (value: string) => {
    if (value === "newest") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("sortBy");
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
      return;
    }
    router.push(`${pathname}?${createQueryString("sortBy", value)}`);
  };

  const hasFilters = searchParams.get("search") || searchParams.get("sortBy");

  const handleClear = () => {
    router.push(pathname);
  };

  const currentSortBy = searchParams.get("sortBy") ?? "newest";

  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Enter product name..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="focus-visible:ring-primary focus-visible:border-primary h-10 bg-card dark:bg-dark-card"
      />
      <SelectDemo
        key={currentSortBy}
        items={items}
        label="Sort by"
        value={currentSortBy}
        onchange={handleFilter}
      />
      {hasFilters && (
        <button
          onClick={handleClear}
          className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-red-200 px-5 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      )}
    </div>
  );
}