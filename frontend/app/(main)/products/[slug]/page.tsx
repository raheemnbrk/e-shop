"use client";

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
