"use client";

import {
    Menu,
    Moon,
    Sun,
    ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useThemeStore } from "@/lib/store/themeStore";

interface AdminNavbarProps {
    onMenuClick: () => void;
}

export default function AdminNavbar({
    onMenuClick,
}: AdminNavbarProps) {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b border-border bg-card dark:border-dark-border dark:bg-dark-card lg:left-64">
            <div className="flex h-full items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="cursor-pointer rounded-lg p-2 text-text-secondary transition hover:bg-background hover:text-text dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text lg:hidden"
                        aria-label="Open sidebar"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-text dark:text-dark-text">
                            Administration
                        </p>

                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                            Manage your store
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="cursor-pointer rounded-lg p-2.5 text-text-secondary transition hover:bg-background hover:text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-primary"
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>

                    <Link
                        href="/"
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text transition hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text dark:hover:border-primary dark:hover:text-primary"
                    >
                        <ShoppingCart className="h-4 w-4" />

                        <span className="hidden sm:inline">
                            Customer page
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}