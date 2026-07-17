import { login } from "@/lib/api/authApi";
import { mergeCart } from "@/lib/api/cartApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore";
import { loginInput } from "@/types/authTypes";
import { addToCartInput } from "@/types/cartTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const submitLogin = async (input: loginInput) => {
    setIsPending(true);
    try {
      const data = await login(input);
      if (!data.verified) {
        sessionStorage.setItem("verify_email", input.email);
        toast.info(data.message);
        router.push("/otp-verification?type=login");
        return;
      }
      setAuth(data.user, data.accessToken);

      const localItems = useCartStore.getState().cartItems;
      if (localItems.length > 0) {
        await mergeCart(
          localItems.map((i: addToCartInput) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        );
        useCartStore.getState().clearCart();
        if (data?.user?.id) {
          queryClient.invalidateQueries({ queryKey: ["cart", data.user.id] });
        }
      }

      toast.success("Welcome back!");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Login failed");
    } finally {
      setIsPending(false);
    }
  };

  return { submitLogin, isPending };
};
