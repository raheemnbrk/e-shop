import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import api from "@/lib/api/axios";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cartStore";
import { mergeCart } from "@/lib/api/cartApi";
import { useQueryClient } from "@tanstack/react-query";

export const useAuthCallback = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const completeLogin = async () => {
      try {
        const res = await api.post("/auth/refresh");
        setAuth(res.data.user, res.data.accessToken);

        const localItems = useCartStore.getState().cartItems;
        if (localItems.length > 0) {
          await mergeCart(
            localItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          );
          useCartStore.getState().clearCart();
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        }

        toast.success("Welcome!");
        router.push("/");
      } catch (err) {
        toast.error("Authentication failed");
        router.push("/login");
      }
    };

    completeLogin();
  }, [queryClient, router, setAuth]);
};
