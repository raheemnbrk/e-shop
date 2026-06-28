import { login } from "@/lib/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";
import { loginInput } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const submitLogin = async (input: loginInput) => {
    setIsPending(true);
    try {
      const data = await login(input);
      setAuth(data.user, data.accessToken);
      toast.success("Welcome back!");
      router.push("/");
    } catch (err : any) {
      toast.error(err?.response?.data?.message ?? "Login failed");
    } finally {
      setIsPending(false);
    }
  };

  return { submitLogin, isPending };
};
