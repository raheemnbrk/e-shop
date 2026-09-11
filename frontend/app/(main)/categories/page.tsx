"use client";

import Link from "next/link";
import { ChevronRight, FolderTree, PackageSearch, ArrowRight } from "lucide-react";
import { useGetCategories } from "@/lib/hooks/categories/useGetCategories";

function CategoriesSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            <div className="h-56 md:h-72 w-full rounded-2xl bg-border dark:bg-dark-border animate-pulse" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden"
                    >
                        <div className="aspect-video w-full bg-border dark:bg-dark-border animate-pulse" />
                        <div className="p-5 space-y-3">
                            <div className="h-5 w-32 bg-border dark:bg-dark-border rounded animate-pulse" />
                            <div className="h-4 w-24 bg-border dark:bg-dark-border rounded animate-pulse" />
                        </div>
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

function CategoryCard({ category }: { category: any }) {
    const subCount = category.children?.length ?? 0;

    return (
        <Link
            href={`/categories/${category.slug}`}
            className="group overflow-hidden rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 dark:hover:border-primary/40"
        >
            <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 dark:from-dark-background dark:to-dark-card">
                {category.image ? (
                    <img
                        src={category.image}
                        alt={category.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
                        <FolderTree className="size-12 text-primary" />
                    </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-text dark:text-dark-text group-hover:text-primary transition-colors line-clamp-1">
                        {category.name}
                    </h3>
                    <ArrowRight className="size-4 shrink-0 text-text-secondary dark:text-dark-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                <div className="flex items-center gap-3 text-xs">
                    <span className="text-text-secondary dark:text-dark-text-secondary">
                        {category.productCount ?? 0} products
                    </span>
                    {subCount > 0 && (
                        <>
                            <span className="size-1 rounded-full bg-border dark:bg-dark-border" />
                            <span className="text-text-secondary dark:text-dark-text-secondary">
                                {subCount} {subCount === 1 ? "subcategory" : "subcategories"}
                            </span>
                        </>
                    )}
                </div>

                {subCount > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {category.children.slice(0, 3).map((child: any) => (
                            <span
                                key={child.id}
                                className="rounded-full bg-background dark:bg-dark-background border border-border dark:border-dark-border px-2.5 py-0.5 text-xs text-text-secondary dark:text-dark-text-secondary"
                            >
                                {child.name}
                            </span>
                        ))}
                        {subCount > 3 && (
                            <span className="rounded-full bg-background dark:bg-dark-background border border-border dark:border-dark-border px-2.5 py-0.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                                +{subCount - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </Link>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}