import { useAuthStore } from "@/lib/store/authStore";
import { useGetCartItems } from "./useGetCartItems";
import { useCartStore } from "@/lib/store/cartStore";

export const useCartCount = () => {
  const { user } = useAuthStore();
  const { data: dbCart } = useGetCartItems();
  const { totalItems, totalPrice } = useCartStore();

  if (dbCart && user) {
    const count = dbCart.items.reduce((acc, i) => acc + i.quantity, 0);
    const price = dbCart.items.reduce((acc, i) => {
      const p =
        i.product.discount > 0
          ? i.product.price - (1 - i.product.discount / 100)
          : i.product.price;

      return acc + p * i.quantity;
    }, 0);

    return { count, price };
  }

  return {
    count: totalItems(),
    price: totalPrice(),
  };
};
