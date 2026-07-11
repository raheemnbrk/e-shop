"use client";

import ProductCard from "@/components/features/products/productCard";
import Search from "@/components/features/products/search";
import { useGetAllProducts } from "@/lib/hooks/products/useGetAllProducts";
import Link from "next/link";

export default function Products() {
  const { data: products, isPending, isError } = useGetAllProducts();
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
