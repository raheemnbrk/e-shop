"use client";

import { Trash2 } from "lucide-react";
import CartItemCard from "@/components/features/cart/cartItem";
import CartSummary from "@/components/features/cart/cartSummary";
import EmptyCart from "@/components/features/cart/emptyCart";
import { useGetCart } from "@/lib/hooks/cart/useCart";
import CartLoading from "@/components/loading/cartLoading";
import { useClearCart } from "@/lib/hooks/cart/useClearCart";

export default function CartPage() {
  const { items, isLoading, isError } = useGetCart();
  const { handleClearCart, isPending } = useClearCart();

  if (isLoading) return <CartLoading />;

  if (items.length === 0 || isError) return <EmptyCart />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text dark:text-dark-text">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
            {10} items in your cart
          </p>
        </div>
        <button
          onClick={handleClearCart}
          disabled={isPending}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition cursor-pointer border border-red-200 dark:border-red-900 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950"
        >
          <Trash2 className="h-4 w-4" />
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {items.map((item) => (
            <CartItemCard
              key={item.productId}
              item={item}
              //   onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>

        <CartSummary subtotal={10} itemCount={10} />
      </div>
    </div>
  );
}
