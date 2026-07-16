"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import type { CartItem as CartItemType } from "@/types/cartTypes";

interface CartItemProps {
  item: CartItemType;
  // onRemove: (productId: string) => void;
  // onUpdateQuantity: (productId: string, quantity: number) => void;
}

export default function CartItemCard({
  item,
  // onRemove,
  // onUpdateQuantity,
}: CartItemProps) {
  const finalPrice =
    item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;

  return (
    <div className="flex gap-4 p-4 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-xl">
      <Link href={`/products/${item.slug}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-24 rounded-lg object-cover border border-border dark:border-dark-border"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${item.slug}`}>
            <h3 className="text-sm font-semibold text-text dark:text-dark-text line-clamp-2 hover:text-primary transition-colors">
              {item.name}
            </h3>
          </Link>
          <button
            // onClick={() => onRemove(item.productId)}
            className="shrink-0 text-text-secondary dark:text-dark-text-secondary hover:text-red-500 transition-colors cursor-pointer"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-text dark:text-dark-text">
            ${finalPrice.toFixed(2)}
          </span>
          {item.discount > 0 && (
            <span className="text-xs text-text-secondary dark:text-dark-text-secondary line-through">
              ${item.price}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center overflow-hidden rounded-lg border border-border dark:border-dark-border w-fit">
            <button
              // onClick={() =>
              //   onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))
              // }
              className="flex h-8 w-8 cursor-pointer items-center justify-center text-text-secondary dark:text-dark-text-secondary transition hover:bg-background dark:hover:bg-dark-background"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="flex h-8 w-10 items-center justify-center border-x border-border dark:border-dark-border text-sm font-semibold text-text dark:text-dark-text">
              {item.quantity}
            </span>
            <button
              // onClick={() =>
              //   onUpdateQuantity(
              //     item.productId,
              //     Math.min(item.stock, item.quantity + 1),
              //   )
              // }
              className="flex h-8 w-8 cursor-pointer items-center justify-center text-text-secondary dark:text-dark-text-secondary transition hover:bg-background dark:hover:bg-dark-background"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <span className="text-sm font-semibold text-text dark:text-dark-text">
            ${(finalPrice * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
