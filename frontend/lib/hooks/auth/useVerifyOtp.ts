import { resendOtp, verifyOtp } from "@/lib/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";
import { verifyOtpInput } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useVerifyOtp = (email: string) => {
  const [isPending, setIsPending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const submitOtp = async (otp: string) => {
    try {
      setIsPending(true);
      const data = await verifyOtp({ email, otp });
      setAuth(data.user, data.accessToken);
      localStorage.removeItem("verify_email");
      toast.success("Email verified! Welcome");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Invalid code");
    } finally {
      setIsPending(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const data = await resendOtp(email);
      toast.success(data.message);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Invalid code");
    }
  };

  return { isPending, isResending, submitOtp, handleResend };
};
