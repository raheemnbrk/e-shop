import { addToCart } from "@/lib/api/cartApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore";
import { addToCartInput, CartItem } from "@/types/cartTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToCart = () => {
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const queryClient = useQueryClient();

  const { mutate: handleAddToCart, isPending } = useMutation({
    mutationFn: (input: addToCartInput) => addToCart(input),
    onSuccess: () => {
      toast.success("Item added to cart.");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    },
  });

  const addToCartHandler = (item: CartItem) => {
    if (user) {
      handleAddToCart({ productId: item.productId, quantity: item.quantity });
    } else {
      addItem(item);
      toast.success("Item added to cart.");
    }
  };

  return { addToCartHandler, isPending };
};
