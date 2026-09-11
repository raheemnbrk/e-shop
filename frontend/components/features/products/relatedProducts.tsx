import { useGetRelatedProducts } from "@/lib/hooks/products/useGetRelatedProducts";
import ProductCard from "./productCard";
import CardsLoading from "@/components/loading/cardsLoading";
import NoFoundProduct from "./noFoundProducts";
import Link from "next/link";

export default function RelatedProducts({ slug }: { slug: string }) {
  const { data: products, isLoading, isError } = useGetRelatedProducts(slug);

  if (isLoading) return <CardsLoading />;
  if (isError || !products || products.length === 0) return <NoFoundProduct />;

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Related Products
        </h2>
        <p className="mt-1 text-sm md:text-base text-text-secondary dark:text-dark-text-secondary">
          You might also like these products.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}