"use client";

import { logout } from "@/lib/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const { clearAuth, setLoading } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      clearAuth();
      toast.success(data.message);
      router.push("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout };
};
