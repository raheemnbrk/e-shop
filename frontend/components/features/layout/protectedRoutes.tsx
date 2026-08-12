"use client"

import Loader from "@/components/loading/loader";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
    requiredRole?: "CUSTOMER" | "ADMIN" | "SELLER"
}

export default function ProtectedRoutes({ children, requiredRole }: Props) {
    const { user, loading } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (loading) return
        if (!user) {
            router.push("/");
            return;
        }
        if (requiredRole && requiredRole !== user.role) {
            router.push("/");
        }
    }, [user, loading, requiredRole])

    if (loading) return <Loader message="Loading..." />
    if (!user) return null
    if (requiredRole && user.role !== requiredRole) return null;

    return <>{children}</>;
}