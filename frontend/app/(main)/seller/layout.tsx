"use client"

import ProtectedRoutes from "@/components/features/layout/protectedRoutes";
import SellerNavbar from "@/components/features/layout/seller/navbar";
import SellerSidebar from "@/components/features/layout/seller/sidebar";
import { useState } from "react";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
    return (
        <ProtectedRoutes requiredRole="SELLER">
            <div className="min-h-screen bg-background dark:bg-dark-background">
                <SellerSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <SellerNavbar
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="min-h-screen pt-4 lg:ml-64">
                    <div>
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoutes>
    )
}