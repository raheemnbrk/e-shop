import { removeItemApi } from "@/lib/api/cartApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveItem = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { removeItem } = useCartStore();

  const { mutate: handlerRemoveItem, isPending } = useMutation({
    mutationFn: (productId: string) => removeItemApi(productId),
    onSuccess: () => {
      toast.success("Item removed from cart.");
      queryClient.invalidateQueries({
        queryKey: ["cart", user?.id],
      });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    },
  });

  const removeItemHandler = (productId: string) => {
    if (user) handlerRemoveItem(productId);
    else {
      removeItem(productId);
      toast.success("Item removed from cart.");
    }
  };

  return { removeItemHandler, isPending };
};
