"use client";

import { useEffect, useRef, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowRight, PackageSearch, FolderTree } from "lucide-react";
import ProductCard from "@/components/features/products/productCard";
import CardsLoading from "@/components/loading/cardsLoading";
import CategoryCard from "@/components/features/products/categoryCard";
import { useGetCategoryBySlug } from "@/lib/hooks/categories/useGetCategoryBySlug";
import { useGetAllProducts } from "@/lib/hooks/products/useGetAllProducts";

function NoFoundProduct() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border dark:border-dark-border py-24 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-border dark:bg-dark-border mb-5">
                <PackageSearch className="size-10 text-text-secondary dark:text-dark-text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2">
                No products found
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary max-w-xs">
                We couldn't find any products in this category.
            </p>
        </div>
    );
}

function Breadcrumb() {
    const params = useParams();
    const slug = params.slug as string;
    const { data: category } = useGetCategoryBySlug(slug);

    return (
        <nav className="flex items-center gap-2 text-sm">
            <Link
                href="/"
                className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
            >
                Home
            </Link>
            <ChevronRight className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
            <Link
                href="/categories"
                className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
            >
                Categories
            </Link>
            <ChevronRight className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
            <span className="font-medium text-text dark:text-dark-text capitalize">
                {category?.name ?? slug}
            </span>
        </nav>
    );
}

function CategoryHero() {
    const params = useParams();
    const slug = params.slug as string;
    const { data: category, isLoading } = useGetCategoryBySlug(slug);

    if (isLoading) {
        return (
            <div className="h-72 md:h-80 w-full rounded-3xl bg-border dark:bg-dark-border animate-pulse" />
        );
    }

    if (!category) return null;

    return (
        <div className="relative w-full overflow-hidden rounded-3xl border border-border dark:border-dark-border bg-card dark:bg-dark-card">
            <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-3 relative z-10 flex flex-col justify-center gap-5 p-8 md:p-12 lg:p-14">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 dark:bg-primary/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        Category
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text dark:text-dark-text capitalize leading-[1.05] tracking-tight">
                        {category.name}
                    </h1>

                    <p className="text-sm md:text-base text-text-secondary dark:text-dark-text-secondary max-w-lg leading-relaxed">
                        Explore our curated collection of {category.name.toLowerCase()} —
                        handpicked quality products at prices you'll love.
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 mt-1">
                        <span className="inline-flex items-center gap-2 rounded-full bg-background dark:bg-dark-background border border-border dark:border-dark-border px-3.5 py-1.5 text-xs font-semibold text-text dark:text-dark-text">
                            <PackageSearch className="size-3.5 text-primary" />
                            {category.productCount ?? 0} products
                        </span>
                        {category.children?.length > 0 && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-background dark:bg-dark-background border border-border dark:border-dark-border px-3.5 py-1.5 text-xs font-semibold text-text dark:text-dark-text">
                                <FolderTree className="size-3.5 text-primary" />
                                {category.children.length} subcategories
                            </span>
                        )}
                    </div>
                </div>

                <div className="md:col-span-2 relative h-64 md:h-auto md:min-h-88">
                    {category.image ? (
                        <img
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 size-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-primary/70" />
                    )}
                </div>
            </div>

            <div className="pointer-events-none absolute inset-0 hidden md:block bg-linear-to-r from-card dark:from-dark-card from-0% via-card/60 dark:via-dark-card/60 via-40% to-transparent to-60%" />
            <div className="pointer-events-none absolute inset-0 md:hidden bg-linear-to-t from-card dark:from-dark-card from-0% via-card/60 dark:via-dark-card/60 via-40% to-transparent to-60%" />
        </div>
    );
}

function SubcategorySection() {
    const params = useParams();
    const slug = params.slug as string;
    const { data: category, isLoading } = useGetCategoryBySlug(slug);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <div className="h-6 w-40 bg-border dark:bg-dark-border rounded animate-pulse" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
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

    if (!category?.children || category.children.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold text-text dark:text-dark-text">
                    Browse Subcategories
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.children.map((child) => (
                    <CategoryCard
                        key={child.id}
                        category={child}
                    />
                ))}
            </div>
        </div>
    );
}

function ProductsGrid() {
    const searchParams = useSearchParams();
    const params = useParams();
    const slug = params.slug as string;

    const search = searchParams.get("search") ?? undefined;
    const sortByParam = searchParams.get("sortBy");
    const sortBy = ["newest", "highest", "lowest", "discount"].includes(
        sortByParam ?? "",
    )
        ? (sortByParam as "newest" | "highest" | "lowest" | "discount")
        : undefined;

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetAllProducts({ search, sortBy, category: slug });

    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 },
        );
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const products = data?.pages.flatMap((page) => page.products) ?? [];

    if (isLoading) return <CardsLoading />;
    if (isError) return <NoFoundProduct />;
    if (products.length === 0) return <NoFoundProduct />;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold text-text dark:text-dark-text">
                    Products
                </h2>
                <Link
                    href={`/products?category=${slug}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group"
                >
                    View all
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.slug}`}>
                        <ProductCard product={product} />
                    </Link>
                ))}
            </div>

            <div ref={observerRef} className="h-10" />

            {isFetchingNextPage && <CardsLoading />}
        </div>
    );
}

export default function CategoryPage() {
    return (
        <div className="flex flex-col gap-8">
            <Suspense
                fallback={
                    <div className="h-5 w-64 bg-border dark:bg-dark-border rounded animate-pulse" />
                }
            >
                <Breadcrumb />
            </Suspense>

            <Suspense
                fallback={
                    <div className="h-56 md:h-72 w-full rounded-2xl bg-border dark:bg-dark-border animate-pulse" />
                }
            >
                <CategoryHero />
            </Suspense>

            <Suspense
                fallback={
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
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
                }
            >
                <SubcategorySection />
            </Suspense>

            <Suspense fallback={<CardsLoading />}>
                <ProductsGrid />
            </Suspense>
        </div>
    );
}