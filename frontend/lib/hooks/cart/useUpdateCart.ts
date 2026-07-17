import { updateCartApi } from "@/lib/api/cartApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore";
import { addToCartInput } from "@/types/cartTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCart = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { updateCart } = useCartStore();

  const { mutate: updateCartHandler, isPending } = useMutation({
    mutationFn: (input: addToCartInput) => updateCartApi(input),

    onSuccess: () => {
      toast.success("Cart updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    },
  });

  const handleUpdateCart =(input: addToCartInput) => {
    if (user) updateCartHandler(input);
    else {
      updateCart(input);
      toast.success("Cart updated successfully.");
    }
  };

  return { handleUpdateCart, isPending };
};
