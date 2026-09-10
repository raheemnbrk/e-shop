import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types/productTypes";
import { useAddToCart } from "@/lib/hooks/cart/useAddToCart";
import { CartItem } from "@/types/cartTypes";

export default function ProductCard({ product }: { product: Product }) {
  const newPrice =
    product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : product.price;

  const averageRating =
    (product.reviews?.length ?? 0) > 0
      ? Math.floor(
        product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length,
      )
      : 0;

  const isNew = product.createdAt
    ? Date.now() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000
    : false;

  const cartItem: CartItem = {
    productId: product.id,
    image: product.images[0],
    quantity: 1,
    name: product.name,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
    slug: product.slug,
  };

  const { addToCartHandler, isPending } = useAddToCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 dark:border-dark-border bg-card dark:bg-dark-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 dark:hover:border-primary/40">
      <div className="relative aspect-square w-full overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 dark:from-dark-background dark:to-dark-card">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wide bg-red-500 text-white rounded-full shadow-sm">
              -{product.discount}%
            </span>
          )}
          {isNew && (
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wide bg-emerald-500 text-white rounded-full shadow-sm">
              New
            </span>
          )}
        </div>

        <button
          type="button"
          className="absolute top-3 right-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm border border-border/60 dark:border-dark-border shadow-sm transition-all duration-200 hover:bg-red-500 hover:border-red-500 hover:scale-110 text-text-secondary dark:text-dark-text-secondary hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="size-4" />
        </button>

        <img
          src={product.images[0]}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <p className="text-xs font-medium uppercase tracking-widest text-text-secondary/80 dark:text-dark-text-secondary/80">
          {product.category.name}
        </p>

        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-text dark:text-dark-text transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3 ${i < averageRating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  }`}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
            ({product.reviews?.length ?? 0})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-text dark:text-dark-text">
              ${newPrice}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-text-secondary dark:text-dark-text-secondary line-through">
                ${product.price}
              </span>
            )}
          </div>

          <button
            type="button"
            className="relative flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-sm transition-all duration-200 hover:bg-primaryHover hover:scale-110 hover:shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCartHandler(cartItem);
            }}
            disabled={isPending}
            aria-label="Add to cart"
          >
            {isPending ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <ShoppingCart className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}