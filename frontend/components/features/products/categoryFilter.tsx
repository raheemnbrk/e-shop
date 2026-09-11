"use client";

import { useState, useCallback } from "react";
import { ChevronDown, X, SlidersHorizontal, Check, FolderTree } from "lucide-react";
import { useGetCategories } from "@/lib/hooks/categories/useGetCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter() {
  const { data: categories, isLoading } = useGetCategories();
  const [opened, setOpened] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const hasFilters =
    selected ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-full md:w-auto items-center justify-center gap-2 rounded-md border border-border dark:border-dark-border bg-card dark:bg-dark-card px-4 text-sm text-text dark:text-dark-text cursor-pointer hover:border-primary transition-colors"
      >
        <SlidersHorizontal className="size-4 text-primary" />
        Filters
        {hasFilters && (
          <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            !
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border dark:border-dark-border bg-card dark:bg-dark-card animate-in slide-in-from-right duration-300">

            <div className="flex shrink-0 items-center justify-between border-b border-border dark:border-dark-border px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-text dark:text-dark-text">
                  Filters
                </h2>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">
                  Narrow down your results
                </p>
              </div>
              <div className="flex items-center gap-2">
                {hasFilters && (
                  <button
                    onClick={handleClear}
                    className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-background dark:bg-dark-background border border-border dark:border-dark-border text-text dark:text-dark-text hover:border-primary transition-colors"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-5 border-b border-border dark:border-dark-border">
                <div className="flex items-center gap-2 mb-4">
                  <FolderTree className="size-4 text-primary" />
                  <p className="text-sm font-semibold text-text dark:text-dark-text">
                    Categories
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  {categories?.map((category) => {
                    const isOpened = opened === category.slug;
                    const isSelected = selected === category.slug;
                    const hasChildren = category.children?.length > 0;

                    return (
                      <div key={category.slug}>
                        <div
                          className={`flex items-center gap-1 rounded-xl transition-colors ${
                            isSelected
                              ? "bg-primary/10 dark:bg-primary/20"
                              : isOpened
                                ? "bg-background dark:bg-dark-background"
                                : "hover:bg-background dark:hover:bg-dark-background"
                          }`}
                        >
                          <button
                            onClick={() => handleSelectCategory(category.slug)}
                            className="flex flex-1 cursor-pointer items-center gap-3 p-3 min-w-0"
                          >
                            <div className="relative shrink-0">
                              <img
                                src={category.image}
                                alt={category.name}
                                className="size-10 rounded-lg object-cover border border-border dark:border-dark-border"
                              />
                              {isSelected && (
                                <div className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary">
                                  <Check className="size-2.5 text-white" strokeWidth={3} />
                                </div>
                              )}
                            </div>

                            <div className="text-left min-w-0 flex-1">
                              <p
                                className={`text-sm font-medium truncate ${
                                  isSelected
                                    ? "text-primary"
                                    : "text-text dark:text-dark-text"
                                }`}
                              >
                                {category.name}
                              </p>
                              <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                {category.productCount ?? 0} products
                              </p>
                            </div>
                          </button>

                          {hasChildren && (
                            <button
                              onClick={() =>
                                setOpened(isOpened ? null : category.slug)
                              }
                              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-card dark:hover:bg-dark-card mr-2 transition-colors"
                              aria-label={isOpened ? "Collapse" : "Expand"}
                            >
                              <ChevronDown
                                className={`size-4 transition-transform ${
                                  isOpened ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {isOpened && hasChildren && (
                          <div className="ml-6 mt-1 flex flex-col gap-0.5 border-l-2 border-border dark:border-dark-border pl-2">
                            {category.children.map((child) => {
                              const isChildSelected = selected === child.slug;
                              return (
                                <button
                                  key={child.slug}
                                  onClick={() =>
                                    handleSelectCategory(child.slug)
                                  }
                                  className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                                    isChildSelected
                                      ? "bg-primary/10 dark:bg-primary/20 text-primary font-semibold"
                                      : "text-text-secondary dark:text-dark-text-secondary hover:bg-background dark:hover:bg-dark-background hover:text-text dark:hover:text-dark-text"
                                  }`}
                                >
                                  <span className="flex items-center gap-2 min-w-0">
                                    {isChildSelected && (
                                      <Check
                                        className="size-3.5 shrink-0"
                                        strokeWidth={3}
                                      />
                                    )}
                                    <span className="truncate">
                                      {child.name}
                                    </span>
                                  </span>
                                  <span
                                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                                      isChildSelected
                                        ? "bg-primary text-white"
                                        : "bg-border dark:bg-dark-border text-text-secondary dark:text-dark-text-secondary"
                                    }`}
                                  >
                                    {child.productCount ?? 0}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-5">
                <p className="mb-4 text-sm font-semibold text-text dark:text-dark-text">
                  Price range
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary dark:text-dark-text-secondary">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background pl-7 pr-3 py-2.5 text-sm text-text dark:text-dark-text outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <span className="text-text-secondary dark:text-dark-text-secondary text-sm shrink-0">
                    —
                  </span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary dark:text-dark-text-secondary">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background pl-7 pr-3 py-2.5 text-sm text-text dark:text-dark-text outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-border dark:border-dark-border p-4">
              <button
                onClick={() => {
                  handleApplyPrice();
                  setIsOpen(false);
                }}
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primaryHover cursor-pointer"
              >
                Apply filters
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}