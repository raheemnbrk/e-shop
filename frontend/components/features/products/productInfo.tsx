"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Zap, Star, Package } from "lucide-react";
import { Product } from "@/types/productTypes";
import { CartItem } from "@/types/cartTypes";
import { useAddToCart } from "@/lib/hooks/cart/useAddToCart";

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const newPrice =
    product.discount > 0
      ? (product.price - product.price * product.discount).toFixed(2)
      : product.price;
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-blue-50 dark:bg-blue-950 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          {product.category.name}
        </span>
        {product.stock > 0 ? (
          <span className="flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-950 px-3 py-1 text-xs font-semibold text-green-600">
            <Package className="h-3 w-3" /> In stock
          </span>
        ) : (
          <span className="rounded-full bg-red-50 dark:bg-red-950 px-3 py-1 text-xs font-semibold text-red-500">
            Out of stock
          </span>
        )}
      </div>

      <h1 className="text-2xl font-bold leading-snug text-text dark:text-dark-text">
        {product.name}
      </h1>

      {avgRating && (
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(Number(avgRating))
                    ? "fill-current"
                    : "fill-none"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
            {avgRating} ({product.reviews.length} reviews)
          </span>
        </div>
      )}

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary">${newPrice}</span>
        {product.discount > 0 && (
          <span className="text-base text-text-secondary dark:text-dark-text-secondary line-through">
            ${product.price}
          </span>
        )}
        {product.discount > 0 && (
          <span className="rounded-md bg-red-100 dark:bg-red-950 px-2 py-0.5 text-xs font-bold text-red-600">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="border-t border-border dark:border-dark-border pt-4">
        <p className="text-sm font-semibold text-text dark:text-dark-text mb-1.5">
          Description
        </p>
        <p className="text-sm leading-6 text-text-secondary dark:text-dark-text-secondary">
          {product.description}
        </p>
      </div>

      <div className="border-t border-border dark:border-dark-border pt-4">
        <p className="text-sm font-semibold text-text dark:text-dark-text mb-3">
          Quantity
        </p>
        <div className="flex items-center overflow-hidden rounded-lg border border-border dark:border-dark-border w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 cursor-pointer items-center justify-center text-text-secondary dark:text-dark-text-secondary transition hover:bg-background dark:hover:bg-dark-background"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="flex h-9 w-12 items-center justify-center border-x border-border dark:border-dark-border text-sm font-bold text-text dark:text-dark-text">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="flex h-9 w-9 cursor-pointer items-center justify-center text-text-secondary dark:text-dark-text-secondary transition hover:bg-background dark:hover:bg-dark-background"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          disabled={product.stock === 0 || isPending}
          onClick={() => addToCartHandler(cartItem)}
          className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition hover:bg-primaryHover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
        <button
          disabled={product.stock === 0}
          className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap className="h-4 w-4" />
          Buy now
        </button>
      </div>

      <div className="border-t border-border dark:border-dark-border pt-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img
            src={product.seller.logo}
            alt={product.seller.storeName}
            className="h-9 w-9 rounded-lg object-cover border border-border dark:border-dark-border"
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

        <div className="flex items-center gap-3">
          <img
            src={product.category.image}
            alt={product.category.name}
            className="h-9 w-9 rounded-lg object-cover border border-border dark:border-dark-border"
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
    </div>
  );
}
