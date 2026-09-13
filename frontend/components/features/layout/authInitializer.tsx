"use client";

import { refreshToken } from "@/lib/hooks/auth/useRefreshToken";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

export default function AuthInitializer() {
  const { setAuth, setLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        const { accessToken, user } = await refreshToken();
        setAuth(user, accessToken);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return null;
}
