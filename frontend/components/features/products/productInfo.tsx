"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Zap, Star,  Shield, Truck, RotateCcw } from "lucide-react";
import { Product } from "@/types/productTypes";
import { CartItem } from "@/types/cartTypes";
import { useAddToCart } from "@/lib/hooks/cart/useAddToCart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const router = useRouter()

  const newPrice =
    product.discount > 0
      ? (product.price - product.price * product.discount / 100).toFixed(2)
      : product.price.toFixed(2);

  const avgRating =
    product.reviews.length > 0
      ? (
        product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
      ).toFixed(1)
      : null;

  const { addToCartHandler, isPending } = useAddToCart();

  const cartItem: CartItem = {
    productId: product.id,
    image: product.images[0],
    quantity,
    name: product.name,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
    slug: product.slug,
  };

  const totalPrice = (parseFloat(newPrice) * quantity).toFixed(2);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary/10 dark:bg-primary/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {product.category.name}
        </span>
        {product.stock > 0 ? (
          <span className="flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-green-950/40 px-3.5 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            In stock
          </span>
        ) : (
          <span className="rounded-full bg-red-50 dark:bg-red-950/40 px-3.5 py-1 text-xs font-semibold text-red-500 dark:text-red-400">
            Out of stock
          </span>
        )}
      </div>

      <h1 className="text-3xl font-bold leading-snug text-text dark:text-dark-text">
        {product.name}
      </h1>

      {avgRating && (
        <div className="flex items-center gap-3">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(Number(avgRating))
                  ? "fill-current"
                  : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
            {avgRating} ({product.reviews.length} reviews)
          </span>
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary">•</span>
        </div>
      )}

      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-primary">${newPrice}</span>
        {product.discount > 0 && (
          <>
            <span className="text-base text-text-secondary dark:text-dark-text-secondary line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="rounded-md bg-red-100 dark:bg-red-950/60 px-2.5 py-0.5 text-xs font-bold text-red-600 dark:text-red-400">
              -{product.discount}%
            </span>
          </>
        )}
      </div>

      <div className="border-t border-border dark:border-dark-border pt-5">
        <p className="text-sm font-semibold text-text dark:text-dark-text mb-2">
          Description
        </p>
        <p className="text-sm leading-7 text-text-secondary dark:text-dark-text-secondary">
          {product.description}
        </p>
      </div>

      <div className="border-t border-border dark:border-dark-border pt-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-text dark:text-dark-text mb-2">
              Quantity
            </p>
            <div className="flex items-center overflow-hidden rounded-lg border border-border dark:border-dark-border w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-text-secondary dark:text-dark-text-secondary transition hover:bg-background dark:hover:bg-dark-background hover:text-primary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex h-10 w-14 items-center justify-center border-x border-border dark:border-dark-border text-sm font-bold text-text dark:text-dark-text">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-text-secondary dark:text-dark-text-secondary transition hover:bg-background dark:hover:bg-dark-background hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              Total
            </p>
            <p className="text-2xl font-bold text-primary">${totalPrice}</p>
          </div>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <p className="mt-2 text-xs text-orange-500 font-medium">
            Only {product.stock} items left - order soon!
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          disabled={product.stock === 0 || isPending}
          onClick={() => addToCartHandler(cartItem)}
          className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-primary text-sm font-semibold text-white transition-all duration-200 hover:bg-primaryHover active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
          {isPending ? "Adding..." : "Add to cart"}
        </button>
        <button
          disabled={product.stock === 0 || isPending}
          onClick={async () => {
            try {
              await addToCartHandler(cartItem)
              router.push("/checkout")
            } catch {
              toast.error("Failed to add to cart")
            }
          }}
          className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-lg border-2 border-primary text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap className="h-4 w-4" />
          Buy now
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-border dark:border-dark-border pt-5">
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-background dark:bg-dark-background/50">
          <Truck className="h-5 w-5 text-primary mb-1.5" />
          <p className="text-[10px] font-medium text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
            Free Shipping
          </p>
          <p className="text-xs text-text-secondary/60 dark:text-dark-text-secondary/60">
            On orders $50+
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-background dark:bg-dark-background/50">
          <Shield className="h-5 w-5 text-primary mb-1.5" />
          <p className="text-[10px] font-medium text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
            Secure Payment
          </p>
          <p className="text-xs text-text-secondary/60 dark:text-dark-text-secondary/60">
            100% protected
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-background dark:bg-dark-background/50">
          <RotateCcw className="h-5 w-5 text-primary mb-1.5" />
          <p className="text-[10px] font-medium text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
            Easy Returns
          </p>
          <p className="text-xs text-text-secondary/60 dark:text-dark-text-secondary/60">
            30 day policy
          </p>
        </div>
      </div>

      <div className="border-t border-border dark:border-dark-border pt-5 flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-background dark:bg-dark-background/50">
          <img
            src={product.seller.logo}
            alt={product.seller.storeName}
            className="h-11 w-11 rounded-xl object-cover border border-border dark:border-dark-border"
          />
          <div>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              Sold by
            </p>
            <p className="text-sm font-semibold text-text dark:text-dark-text">
              {product.seller.storeName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-background dark:bg-dark-background/50">
          <img
            src={product.category.image}
            alt={product.category.name}
            className="h-11 w-11 rounded-xl object-cover border border-border dark:border-dark-border"
          />
          <div>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              Category
            </p>
            <p className="text-sm font-semibold text-text dark:text-dark-text">
              {product.category.name}
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}