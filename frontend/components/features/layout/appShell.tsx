"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Loader from "@/components/loading/loader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { loading } = useAuthStore();
  if (loading) return <Loader />;
  return <>{children}</>;
}
