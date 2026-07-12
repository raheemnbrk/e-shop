"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useGetCategories } from "@/lib/hooks/categories/useGetCategories";

export default function CategoryFilter() {
  const { data: categories, isLoading } = useGetCategories();

  const [opened, setOpened] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 animate-pulse">
        <div className="mb-5 h-5 w-28 rounded bg-border" />

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mb-3">
            <div className="flex items-center justify-between rounded-lg p-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-border" />
                <div className="h-4 w-28 rounded bg-border" />
              </div>

              <div className="h-4 w-8 rounded bg-border" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <aside className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider">
          Categories
        </h2>

        <button
          onClick={() => {
            setOpened(null);
            setSelected(null);
          }}
          className="cursor-pointer text-xs text-primary hover:underline"
        >
          Clear
        </button>
      </div>

      <div>
        {categories?.map((category) => {
          const isOpen = opened === category.id;

          return (
            <div
              key={category.id}
              className="border-b border-border last:border-none"
            >
              <button
                onClick={() => setOpened(isOpen ? null : category.id)}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-3 transition hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />

                  <div className="text-left">
                    <p className="font-medium">{category.name}</p>

                    <p className="text-xs text-text-secondary">
                      {category.productsCount} products
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={`h-5 w-5 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && category.children.length > 0 && (
                <div className="bg-muted/30 py-2">
                  {category.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setSelected(child.id)}
                      className={`flex w-full cursor-pointer items-center justify-between px-14 py-2 text-sm transition ${
                        selected === child.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-primary/5"
                      }`}
                    >
                      <span>{child.name}</span>

                      <span className="rounded-full bg-background px-2 py-0.5 text-xs text-text-secondary">
                        {child.productsCount}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
