"use client";

import { useEffect, useRef, Suspense } from "react";
import ProductCard from "@/components/features/products/productCard";
import { useGetAllProducts } from "@/lib/hooks/products/useGetAllProducts";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Search from "@/components/features/products/search";
import { PackageSearch } from "lucide-react";
import CardsLoading from "@/components/loading/cardsLoading";

function NoFoundProduct() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-border dark:bg-dark-border mb-5">
        <PackageSearch className="size-10 text-text-secondary dark:text-dark-text-secondary" />
      </div>
      <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2">
        No products found
      </h3>
      <p className="text-sm text-text-secondary dark:text-dark-text-secondary max-w-xs">
        We couldn't find any products matching your search. Try adjusting your
        filters or search term.
      </p>
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? undefined;
  const sortByParam = searchParams.get("sortBy");
  const sortBy = ["newest", "highest", "lowest", "discount"].includes(sortByParam ?? "")
    ? (sortByParam as "newest" | "highest" | "lowest" | "discount")
    : undefined;
  const category = searchParams.get("category") ?? undefined;
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllProducts({ search, sortBy, category, minPrice, maxPrice });

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
      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
        Showing{" "}
        <span className="font-semibold text-text dark:text-dark-text">
          {data?.pages[0].pagination.totalItems}
        </span>{" "}
        products
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
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

export default function Products() {
  return (
    <div className="flex flex-col gap-8">

      <div>
        <h1 className="text-2xl font-bold text-text dark:text-dark-text">
          All products
        </h1>
        <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
          Discover thousands of products from verified sellers
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-10 w-full bg-border dark:bg-dark-border rounded-lg animate-pulse" />
        }
      >
        <Search />
      </Suspense>

      <Suspense fallback={<CardsLoading />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}