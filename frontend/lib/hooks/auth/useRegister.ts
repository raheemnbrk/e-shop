import { register } from "@/lib/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";
import { registerInput } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useRegister = () => {
  const { setAuth } = useAuthStore();
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const submitRegister = async (input: registerInput) => {
    setIsPending(true);
    try {
      const data = await register(input);
      setAuth(data.user, data.accessToken);
      router.push("/");
      toast.success("Account created successfully.");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Register failed");
    } finally {
      setIsPending(false);
    }
  };
  return { submitRegister, isPending };
};
