"use client";

import AdminNavbar from "@/components/features/layout/admin/navbar";
import AdminSidebar from "@/components/features/layout/admin/sidebar";
import ProtectedRoutes from "@/components/features/layout/protectedRoutes";
import React, { useState } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <ProtectedRoutes requiredRole="ADMIN">
            <div className="min-h-screen bg-background dark:bg-dark-background">
                <AdminSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <AdminNavbar
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="min-h-screen pt-4 lg:ml-64">
                    <div>
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoutes>
    );
}