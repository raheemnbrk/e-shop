"use client";

import Link from "next/link";
import { ChevronRight, PackageSearch } from "lucide-react";
import CategoryCard from "@/components/features/products/categoryCard";
import { useGetCategories } from "@/lib/hooks/categories/useGetCategories";

function CategoriesSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            <div className="h-56 md:h-72 w-full rounded-2xl bg-border dark:bg-dark-border animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center gap-3 rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4"
                    >
                        <div className="size-20 rounded-full bg-border dark:bg-dark-border animate-pulse" />
                        <div className="h-4 w-24 bg-border dark:bg-dark-border rounded animate-pulse" />
                        <div className="h-3 w-16 bg-border dark:bg-dark-border rounded animate-pulse" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function NoCategories() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-border dark:bg-dark-border mb-5">
                <PackageSearch className="size-10 text-text-secondary dark:text-dark-text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2">
                No categories found
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary max-w-xs">
                There are no categories available at the moment.
            </p>
        </div>
    );
}

export default function CategoriesPage() {
    const { data: categories, isLoading, isError } = useGetCategories();

    if (isLoading) return <CategoriesSkeleton />;
    if (isError || !categories || categories.length === 0) return <NoCategories />;

    const totalProducts = categories.reduce(
        (acc, c) => acc + (c.productCount ?? 0),
        0,
    );

    return (
        <div className="flex flex-col gap-8">
            <nav className="flex items-center gap-2 text-sm">
                <Link
                    href="/"
                    className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                >
                    Home
                </Link>
                <ChevronRight className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
                <span className="font-medium text-text dark:text-dark-text">
                    Categories
                </span>
            </nav>

            <div className="relative h-56 md:h-72 w-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-primary/70" />
                <div className="absolute -right-20 -bottom-20 size-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -left-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-10">
                    <span className="inline-flex w-fit items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white mb-3">
                        Browse
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                        All Categories
                    </h1>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs md:text-sm font-semibold text-white">
                            {categories.length}{" "}
                            {categories.length === 1 ? "category" : "categories"}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs md:text-sm font-semibold text-white">
                            {totalProducts.toLocaleString()} products
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}