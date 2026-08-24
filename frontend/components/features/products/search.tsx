"use client";

import { Input } from "@/components/ui/input";
import { SelectDemo, SelectItemType } from "../layout/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { X } from "lucide-react";

const items: SelectItemType[] = [
  { label: "Newest first", value: "newest" },
  { label: "Price: low to high", value: "lower price" },
  { label: "Price: high to low", value: "higher price" },
  { label: "Name", value: "name" },
];

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
    router.push(`${pathname}?${createQueryString("filter", value)}`);
  };

  const hasFilters = searchParams.get("search") || searchParams.get("filter");

  const handleClear = () => {
    router.push(pathname);
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Enter product name..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="focus-visible:ring-primary focus-visible:border-primary h-10 bg-card dark:bg-dark-card"
      />
      <SelectDemo
        key={searchParams.get("filter") ?? items[0].value}
        items={items}
        defaultValue={searchParams.get("filter") ?? items[0].value}
        label="Sort by"
        onchange={handleFilter}
      />
      {hasFilters && (
        <button
          onClick={handleClear}
          className="flex h-10 items-center gap-2 rounded-lg border bg-card dark:bg-dark-card border-border dark:border-dark-border px-4 text-sm font-medium text-text dark:text-dark-text hover:border-red-500 hover:text-red-500 dark:hover:border-red-500 dark:hover:text-red-500 transition-colors cursor-pointer whitespace-nowrap"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      )}
    </div>
  );
}
