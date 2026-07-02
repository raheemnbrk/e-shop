import { resetPassword } from "@/lib/api/authApi";
import { resetPasswordSchema } from "@/lib/validators/auth.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useResetPassword = () => {
  const [isPending, setIsPending] = useState(false);
  const email = sessionStorage.getItem("reset_email");
  const token = sessionStorage.getItem("reset_token");
  const router = useRouter();

  const handleResetPassword = async (
    password: string,
    confirmedPassword: string,
  ) => {
    const result = resetPasswordSchema.safeParse({
      email,
      resetToken: token,
      password,
      confirmedPassword,
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      setIsPending(true);

      const data = await resetPassword(result.data);
      sessionStorage.removeItem("reset_email");
      sessionStorage.removeItem("reset_token");
      toast.success(data.message);
      router.push("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Reset Password failed.");
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, handleResetPassword };
};
