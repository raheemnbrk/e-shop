"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import type { CartItem } from "@/types/cartTypes";

interface CartSummaryProps {
  cartItems: CartItem[];
}

export default function CartSummary({ cartItems }: CartSummaryProps) {
  const total = cartItems.reduce((sum, item) => {
    const price =
      Number(item.price) * (1 - Number(item.discount) / 100);

    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5 flex flex-col gap-4 sticky top-20">
      <h2 className="text-base font-bold text-text dark:text-dark-text">
        Order Summary
      </h2>

      <div className="flex flex-col gap-3 text-sm">
        {cartItems.map((item) => {
          const finalPrice =
            Number(item.price) * (1 - Number(item.discount) / 100);

          return (
            <div
              key={item.productId}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-text-secondary dark:text-dark-text-secondary truncate">
                {item.name} × {item.quantity}
              </span>

              <span className="font-medium text-text dark:text-dark-text shrink-0">
                ${(finalPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          );
        })}

        <div className="border-t border-border dark:border-dark-border pt-3 flex justify-between font-bold text-text dark:text-dark-text">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Link href="/checkout">
        <button className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primaryHover transition cursor-pointer">
          <ShoppingBag className="h-4 w-4" />
          Checkout
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