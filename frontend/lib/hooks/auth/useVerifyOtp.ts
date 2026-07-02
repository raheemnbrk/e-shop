import { resendOtp, verifyOtp, verifyResetOtp } from "@/lib/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";
import { otpType } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useVerifyOtp = (type: otpType) => {
  const [isPending, setIsPending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState("");
  const { setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const key = type === "register" ? "verify_email" : "reset_email";
    const stored = sessionStorage.getItem(key);

    if (!stored) {
      toast.error("Session expired.");
      router.replace(type === "register" ? "/register" : "/forgot-password");
      return;
    }
    setEmail(stored);
  }, [router, type]);

  const submitOtp = async (otp: string) => {
    setIsPending(true);
    try {
      if (type === "register") {
        const data = await verifyOtp({ email, otp });
        setAuth(data.user, data.accessToken);
        sessionStorage.removeItem("verify_email");
        toast.success("Email verified! Welcome");
        router.push("/");
      } else {
        const data = await verifyResetOtp({ email, otp });
        sessionStorage.setItem("reset_token", data);
        toast.success("Code is verified.");
        router.push("/reset-password");
      }
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
    } finally {
      setIsResending(false);
    }
  };

  return { isPending, isResending, submitOtp, handleResend, email };
};
