"use client";

import { useGetMe } from "@/lib/hooks/auth/usGetMe";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

export default function AuthInitializer() {
  const { setUser, setLoading } = useAuthStore();
  const { data, isSuccess, isError } = useGetMe();

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
    if (isSuccess || isError) {
      setLoading(false);
    }
  }, [isSuccess, isError, data]);

  return null;
}
