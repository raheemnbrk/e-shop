"use client";

import { getMe } from "@/lib/api/authApi";
import { refreshToken } from "@/lib/hooks/auth/useRefreshToken";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

export default function AuthInitializer() {
  const { setUser, setLoading , setAccessToken } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        const { accessToken } = await refreshToken();
        setAccessToken(accessToken);
        const user = await getMe();
        setUser(user);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []); 

  return null;
}
