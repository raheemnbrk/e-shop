import { useAuthStore } from "@/lib/store/authStore";
import { useGetCartItems } from "./useGetCartItems";
import { useCartStore } from "@/lib/store/cartStore";

export const useGetCart = () => {
  const { user } = useAuthStore();
  const dbCart = useGetCartItems();
  const localCart = useCartStore();

  return !user
    ? {
        items: localCart.cartItems,
        isLoading: false,
        isError: false,
      }
    : {
        items:
          dbCart.data?.items.map((item) => ({
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            discount: item.product.discount,
            image: item.product.images[0],
            quantity: item.quantity,
            stock: item.product.stock,
            slug: item.product.slug,
          })) ?? [],
        isLoading: dbCart.isLoading,
        isError: dbCart.isError,
      };
};
