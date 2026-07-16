import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-border dark:bg-dark-border mb-5">
        <ShoppingCart className="h-12 w-12 text-text-secondary dark:text-dark-text-secondary" />
      </div>
      <h2 className="text-xl font-bold text-text dark:text-dark-text mb-2">
        Your cart is empty
      </h2>
      <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-6 max-w-xs">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link href="/products">
        <button className="px-8 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primaryHover transition cursor-pointer">
          Start shopping
        </button>
      </Link>
    </div>
  );
}
