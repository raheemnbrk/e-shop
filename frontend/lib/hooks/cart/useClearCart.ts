import { clearCartApi } from "@/lib/api/cartApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useClearCart = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { clearCart } = useCartStore();

  const { mutate: clearCartHandler, isPending } = useMutation({
    mutationFn: clearCartApi,

    onSuccess: () => {
      toast.success("Cart cleared successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cart", user?.id],
      });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    },
  });

  const handleClearCart = () => {
    if (user) clearCartHandler();
    else {
      clearCart();
      toast.success("Cart cleared successfully.");
    }
  };

  return { handleClearCart, isPending };
};
