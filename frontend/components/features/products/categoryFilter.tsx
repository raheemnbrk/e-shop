"use client";

import { useState, useCallback } from "react";
import { ChevronDown, X } from "lucide-react";
import { useGetCategories } from "@/lib/hooks/categories/useGetCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter() {
  const { data: categories, isLoading } = useGetCategories();
  const [opened, setOpened] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = searchParams.get("category");

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) current.set(key, value);
        else current.delete(key);
      });
      return current.toString();
    },
    [searchParams],
  );

  const handleSelectCategory = (categorySlug: string) => {
    const newValue = selected === categorySlug ? null : categorySlug;
    router.push(`${pathname}?${createQueryString({ category: newValue })}`);
  };

  const handleApplyPrice = () => {
    router.push(
      `${pathname}?${createQueryString({ minPrice: minPrice || null, maxPrice: maxPrice || null })}`,
    );
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    setOpened(null);
    router.push(pathname);
  };

  const hasFilters = selected || minPrice || maxPrice;

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4 animate-pulse space-y-3">
        <div className="h-4 w-24 bg-border dark:bg-dark-border rounded" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-border dark:bg-dark-border" />
              <div className="h-3.5 w-24 bg-border dark:bg-dark-border rounded" />
            </div>
            <div className="h-3 w-6 bg-border dark:bg-dark-border rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <aside className="overflow-hidden rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card">
      <div className="flex items-center justify-between border-b border-border dark:border-dark-border px-4 py-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary">
          Categories
        </h2>
        {hasFilters && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 cursor-pointer text-xs text-primary hover:underline"
          >
            <X className="h-3 w-3" /> Clear all
          </button>
        )}
      </div>

      <div>
        {categories?.map((category) => {
          const isOpen = opened === category.slug;
          return (
            <div
              key={category.slug}
              className="border-b border-border dark:border-dark-border last:border-none"
            >
              <button
                onClick={() => setOpened(isOpen ? null : category.slug)}
                className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 transition-colors ${
                  isOpen
                    ? "bg-blue-50 dark:bg-blue-950"
                    : "hover:bg-background dark:hover:bg-dark-background"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-8 w-8 rounded-lg object-cover border border-border dark:border-dark-border"
                  />
                  <div className="text-left">
                    <p
                      className={`text-sm font-medium ${isOpen ? "text-primary" : "text-text dark:text-dark-text"}`}
                    >
                      {category.name}
                    </p>
                    <p className="text-[11px] text-text-secondary dark:text-dark-text-secondary">
                      {category.productsCount ?? 0} products
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-text-secondary dark:text-dark-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && category.children?.length > 0 && (
                <div className="border-t border-border dark:border-dark-border bg-background dark:bg-dark-background py-1">
                  {category.children.map((child) => (
                    <button
                      key={child.slug}
                      onClick={() => handleSelectCategory(child.slug)}
                      className={`flex w-full cursor-pointer items-center justify-between py-2 pl-14 pr-4 text-sm transition-colors ${
                        selected === child.slug
                          ? "text-primary font-semibold bg-blue-50 dark:bg-blue-950"
                          : "text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text hover:bg-border/30"
                      }`}
                    >
                      <span>{child.name}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          selected === child.id
                            ? "bg-primary text-white"
                            : "bg-border dark:bg-dark-border text-text-secondary dark:text-dark-text-secondary"
                        }`}
                      >
                        {child.productsCount ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-border dark:border-dark-border p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary">
          Price range
        </p>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background px-3 py-2 text-sm text-text dark:text-dark-text outline-none focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-text-secondary dark:text-dark-text-secondary text-sm shrink-0">
            —
          </span>
          <input
            type="number"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background px-3 py-2 text-sm text-text dark:text-dark-text outline-none focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <button
          onClick={handleApplyPrice}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover cursor-pointer"
        >
          Apply filter
        </button>
      </div>
    </aside>
  );
}
