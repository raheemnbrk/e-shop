import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types/productTypes";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-md">
      <div className="relative h-44 w-full overflow-hidden">
        <button
          className="absolute top-2 right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow transition-colors hover:bg-primary hover:text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="h-4 w-4" />
        </button>

        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-1.5 p-3">
        <p className="text-[10px] uppercase tracking-widest text-text-secondary">
          {product.category.name}
        </p>

        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-text">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
          <span className="text-xs text-text-secondary">(248)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-text">${product.price}</span>
          <span className="text-xs text-text-secondary line-through">$349</span>
        </div>

        <button
          className="mt-2 flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-white transition-colors hover:bg-primaryHover"
          onClick={(e) => e.stopPropagation()}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
