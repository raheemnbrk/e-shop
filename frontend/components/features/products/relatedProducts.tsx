import { useGetRelatedProducts } from "@/lib/hooks/products/useGetRelatedProducts";
import ProductCard from "./productCard";
import CardsLoading from "@/components/loading/cardsLoading";
import NoFoundProduct from "./noFoundProducts";
import Link from "next/link";

export default function RelatedProducts({ slug }: { slug: string }) {
  const { data: products, isLoading, isError } = useGetRelatedProducts(slug);

  if (isLoading) return <CardsLoading />;
  if (products?.length === 0 || isError) return <NoFoundProduct />;

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text dark:text-dark-text">
          Related Products
        </h2>
        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
          You might also like these products.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products?.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}