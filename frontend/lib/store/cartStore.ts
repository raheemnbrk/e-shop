import { CartStore } from "@/types/cartTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalItems: () => get().cartItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().cartItems.reduce((sum, i) => {
          const finalPrice =
            i.discount > 0 ? i.price * (1 - i.discount / 100) : i.price;

          return sum + finalPrice * i.quantity;
        }, 0),
      addItem: (item) =>
        set((state) => {
          const existing = state.cartItems.find(
            (i) => i.productId === item.productId,
          );
          let updatedItems;
          if (existing) {
            updatedItems = state.cartItems.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
                : i,
            );
          } else {
            updatedItems = [...state.cartItems, { ...item, quantity: 1 }];
          }
          return { cartItems: updatedItems };
        }),
    }),
    { name: "cart" },
  ),
);
