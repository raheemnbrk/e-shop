"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductGallery from "@/components/features/products/productGallery";
import ProductInfo from "@/components/features/products/productInfo";
import RelatedProducts from "@/components/features/products/relatedProducts";
import ReviewForm from "@/components/features/products/reviews/reviewForm";
import ReviewList from "@/components/features/products/reviews/reviewsList";
import ProductPageSkeleton from "@/components/loading/productPageSkeleton";
import { useGetSingleProduct } from "@/lib/hooks/products/useGetSingleProduct";
import { use } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: product, isPending, isError } = useGetSingleProduct(slug);

  if (isPending) return <ProductPageSkeleton />;
  if (isError || !product) return <div>Product not found.</div>;

  return (
    <div className="flex flex-col space-y-6">
      <nav className="flex items-center gap-1.5 text-sm">
        <Link
          href="/"
          className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
        <Link
          href="/products"
          className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
        >
          All Products
        </Link>
        <ChevronRight className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
        <span className="font-medium text-text dark:text-dark-text truncate max-w-50">
          {product.name}
        </span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
      <ReviewList reviews={product.reviews} />
      <ReviewForm productId={product.id} />
      <RelatedProducts slug={slug} />
    </div>
  );
}