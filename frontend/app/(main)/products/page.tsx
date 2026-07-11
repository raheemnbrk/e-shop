"use client";

import NoFoundProduct from "@/components/features/products/noFoundProducts";
import ProductCard from "@/components/features/products/productCard";
import Search from "@/components/features/products/search";
import CardsLoading from "@/components/loading/cardsLoading";
import { useGetAllProducts } from "@/lib/hooks/products/useGetAllProducts";
import Link from "next/link";

export default function Products() {
  const { data: products, isLoading, isError } = useGetAllProducts();
  
    if (isLoading) return <CardsLoading />;
  
    if (products?.length === 0 || isError) return <NoFoundProduct />;
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl capitalize font-semibold">all products</h1>
        <p className="text-sm font-light text-text-secondary dark:text-dark-text-secondary">
          Discover thousands of products from verified sellers
        </p>
      </div>
      <Search />
      <div>
        <div></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products?.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
