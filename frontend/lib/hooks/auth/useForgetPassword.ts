import { forgetPassword } from "@/lib/api/authApi";
import { forgetPasswordSchema } from "@/lib/validators/auth.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useForgetPassword = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleForgetPassword = async (email: string) => {
    const result = forgetPasswordSchema.safeParse({ email });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setIsPending(true);

    try {
      const data = await forgetPassword(result.data);
      toast.success("Verification code sent.");
      sessionStorage.setItem("reset_email", email);
      router.push("/otp-verification?type=reset");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, handleForgetPassword };
};
