"use client";

import { Suspense } from "react";
import ProductCard from "@/components/features/products/productCard";
import CardsLoading from "@/components/loading/cardsLoading";
import { useGetAllProducts } from "@/lib/hooks/products/useGetAllProducts";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Search from "@/components/features/products/search";
import { PackageSearch } from "lucide-react";
import CategoryFilter from "@/components/features/products/categoryFilter";

function NoFoundProduct() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-border dark:bg-dark-border mb-4">
        <PackageSearch className="h-10 w-10 text-text-secondary dark:text-dark-text-secondary" />
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
  const filter = searchParams.get("filter") ?? undefined;

  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProducts(search, filter);

  if (isLoading) return <CardsLoading />;

  if (isError || !products || products.length === 0) return <NoFoundProduct />;

  return (
    <>
      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
        Showing{" "}
        <span className="font-semibold text-text dark:text-dark-text">
          {products.length}
        </span>{" "}
        products
      </p>
      <div className="flex gap-4" >
        <CategoryFilter />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function SearchFallback() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="h-12 flex-1 bg-border dark:bg-dark-border rounded-lg" />
      <div className="h-12 w-48 bg-border dark:bg-dark-border rounded-lg" />
    </div>
  );
}

export default function Products() {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text dark:text-dark-text">
          All products
        </h1>
        <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
          Discover thousands of products from verified sellers
        </p>
      </div>

      <Suspense fallback={<SearchFallback />}>
        <Search />
      </Suspense>

      <Suspense fallback={<CardsLoading />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
