import { register } from "@/lib/api/authApi";
import { registerInput } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const submitRegister = async (input: registerInput) => {
    setIsPending(true);
    try {
      const data = await register(input);
      sessionStorage.setItem("verify_email", input.email);
      toast.success(data.message);
      router.push("/otp-verification?type=register");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Register failed");
    } finally {
      setIsPending(false);
    }
  };
  return { submitRegister, isPending };
};
