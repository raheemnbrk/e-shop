import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types/productTypes";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card transition-shadow duration-300 hover:shadow-md hover:border-primary dark:hover:border-primary">
      <div className="relative h-44 w-full overflow-hidden bg-background dark:bg-dark-background">
        <button
          className="absolute top-2 right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-card dark:bg-dark-card border border-border dark:border-dark-border shadow transition-colors hover:bg-primary hover:text-white hover:border-primary text-text-secondary dark:text-dark-text-secondary"
          onClick={(e) => e.stopPropagation()}
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
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
            (248)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-text dark:text-dark-text">
            ${product.price}
          </span>
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary line-through">
            $349
          </span>
        </div>

        <button
          className="mt-2 flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-white transition-colors hover:bg-primaryHover"
          onClick={(e) => e.stopPropagation()}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
