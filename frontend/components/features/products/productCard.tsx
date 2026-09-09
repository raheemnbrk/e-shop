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
    <div className="group overflow-hidden rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card transition-shadow duration-300 hover:shadow-md hover:border-primary dark:hover:border-primary">
      <div className="relative h-44 w-full overflow-hidden bg-background dark:bg-dark-background">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-red-500 text-white rounded">
              -{product.discount}%
            </span>
          )}
          {isNew && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-500 text-white rounded">
              New
            </span>
          )}
        </div>

        <button
          type="button"
          className="absolute top-2 right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-card dark:bg-dark-card border border-border dark:border-dark-border shadow transition-colors hover:bg-primary hover:text-white hover:border-primary text-text-secondary dark:text-dark-text-secondary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4" />
        </button>

        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-1.5 p-3">
        <p className="text-[10px] uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary">
          {product.category.name}
        </p>

        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-text dark:text-dark-text">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 fill-current ${i < averageRating ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
            ({product.reviews?.length ?? 0})
          </span>
        </div>

        <div className="flex items-center gap-2">
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
          className="mt-2 flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-white transition-colors hover:bg-primaryHover"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCartHandler(cartItem);
          }}
          disabled={isPending}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
}