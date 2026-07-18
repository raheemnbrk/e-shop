"use client";

import { ShoppingBag, Tag } from "lucide-react";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
}

export default function CartSummary({ subtotal, itemCount }: CartSummaryProps) {
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5 flex flex-col gap-4 sticky top-20">
      <h2 className="text-base font-bold text-text dark:text-dark-text">
        Order Summary
      </h2>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-text-secondary dark:text-dark-text-secondary">
          <span>
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-medium text-text dark:text-dark-text">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-text-secondary dark:text-dark-text-secondary">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="font-medium text-green-600">Free</span>
          ) : (
            <span className="font-medium text-text dark:text-dark-text">
              ${shipping.toFixed(2)}
            </span>
          )}
        </div>

        {shipping > 0 && (
          <p className="text-xs text-primary">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping
          </p>
        )}

        <div className="border-t border-border dark:border-dark-border pt-3 flex justify-between font-bold text-text dark:text-dark-text">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border dark:border-dark-border px-3 py-2">
          <Tag className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary shrink-0" />
          <input
            type="text"
            placeholder="Coupon code"
            className="bg-transparent text-sm outline-none w-full text-text dark:text-dark-text placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary"
          />
        </div>
        <button className="px-3 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition cursor-pointer">
          Apply
        </button>
      </div>

      <Link href="/checkout">
        <button className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primaryHover transition cursor-pointer">
          <ShoppingBag className="h-4 w-4" />
          Place order
        </button>
      </Link>

      <Link
        href="/products"
        className="text-center text-xs text-primary hover:underline"
      >
        Continue shopping
      </Link>
    </div>
  );
}
