// ProductInfo.tsx
"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types/productTypes";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const oldPrice = 349;
  const discount = Math.round(((oldPrice - product.price) / oldPrice) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Category */}
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        {product.category.name}
      </p>

      {/* Name */}
      <h1 className="text-xl font-bold text-text leading-snug">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="text-xs text-text-secondary">4.8 (248 reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-primary">${product.price}</span>
        <span className="text-sm text-text-secondary line-through">${oldPrice}</span>
        <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
          {discount}% OFF
        </span>
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-text">Stock:</span>
        {product.stock > 0 ? (
          <span className="font-semibold text-green-600">{product.stock} available</span>
        ) : (
          <span className="font-semibold text-red-500">Out of stock</span>
        )}
      </div>

      {/* Description */}
      <div>
        <h2 className="mb-1.5 text-sm font-semibold text-text">Description</h2>
        <p className="text-sm leading-6 text-text-secondary">{product.description}</p>
      </div>

      {/* Quantity */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-text">Quantity</h2>
        <div className="flex w-fit items-center overflow-hidden rounded-lg border border-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 cursor-pointer items-center justify-center transition hover:bg-background"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="flex h-9 w-12 items-center justify-center border-x border-border text-sm font-semibold">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="flex h-9 w-9 cursor-pointer items-center justify-center transition hover:bg-background"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition hover:bg-primaryHover">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
        <button className="h-10 flex-1 cursor-pointer rounded-lg border border-primary text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
          Buy Now
        </button>
      </div>
    </div>
  );
}