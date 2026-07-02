"use client";

import Loader from "@/components/loading/loader";
import { useAuthCallback } from "@/lib/hooks/auth/useCallback";

export default function AuthCallbackPage() {
  useAuthCallback()
  return (
   <Loader message="Signing you in...." />
  );
}
