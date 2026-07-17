import { addToCartInput, CartStore } from "@/types/cartTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
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
      removeItem: (productId: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.productId !== productId),
        })),
      clearCart: () => set({ cartItems: [] }),
      updateCart: (input: addToCartInput) =>
        set((state) => ({
          cartItems: state.cartItems.map((i) =>
            i.productId === input.productId
              ? { ...i, quantity: input.quantity }
              : i,
          ),
        })),
    }),
    { name: "cart" },
  ),
);
