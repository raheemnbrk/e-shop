import { useGetRelatedProducts } from "@/lib/hooks/products/useGetRelatedProducts";
import ProductCard from "./productCard";
import { PackageSearch } from "lucide-react";

export default function RelatedProducts({ slug }: { slug: string }) {
  const { data: products, isLoading, isError } = useGetRelatedProducts(slug);

  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <div className="h-36 bg-border" />
            <div className="p-3 flex flex-col gap-2">
              <div className="h-2.5 w-14 bg-border rounded" />
              <div className="h-3.5 bg-border rounded" />
              <div className="h-3.5 w-3/4 bg-border rounded" />
              <div className="h-4 w-12 bg-border rounded" />
              <div className="h-8 bg-border rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );

  if (products?.length === 0 || isError)
    return (
      <section className="mt-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text">Related Products</h2>

          <p className="mt-2 text-text-secondary">
            You might also like these products.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <PackageSearch className="h-8 w-8 text-primary" />
          </div>

          <h3 className="mt-6 text-xl font-semibold text-text">
            No Related Products
          </h3>

          <p className="mt-2 max-w-md text-sm text-text-secondary">
            We couldn't find any similar products right now. Check back later or
            browse other categories.
          </p>
        </div>
      </section>
    );

  return (
    <section className="mt-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text dark:text-dark-text">Related Products</h2>

          <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
            You might also like these products.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
