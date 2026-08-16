"use client";

import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Package,
    Tags,
    Settings,
    Store,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ListItem {
    link: string;
    icon: React.ReactElement;
    label: string;
}

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({
    isOpen,
    onClose,
}: AdminSidebarProps) {
    const pathname = usePathname();

    const list: ListItem[] = [
        {
            link: "/admin",
            icon: <LayoutDashboard className="h-5 w-5" />,
            label: "Dashboard",
        },
        {
            link: "/admin/users",
            icon: <Users className="h-5 w-5" />,
            label: "Users",
        },
        {
            link: "/admin/products",
            icon: <Package className="h-5 w-5" />,
            label: "Products",
        },
        {
            link: "/admin/orders",
            icon: <ShoppingBag className="h-5 w-5" />,
            label: "Orders",
        },
        {
            link: "/admin/categories",
            icon: <Tags className="h-5 w-5" />,
            label: "Categories",
        },
        {
            link: "/admin/sellers",
            icon: <Store className="h-5 w-5" />,
            label: "Sellers",
        },
        {
            link: "/admin/settings",
            icon: <Settings className="h-5 w-5" />,
            label: "Settings",
        },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed left-0 top-0 z-50
                    flex h-screen w-64 flex-col
                    border-r border-border
                    bg-card
                    dark:border-dark-border
                    dark:bg-dark-card
                    transition-transform duration-300
                    lg:translate-x-0
                    ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-border px-5 dark:border-dark-border">
                    <Link
                        href="/admin"
                        onClick={onClose}
                        className="flex items-center gap-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                            <Store className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-text dark:text-dark-text">
                                Admin Panel
                            </p>

                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                Management
                            </p>
                        </div>
                    </Link>

                    {/* Mobile close */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer rounded-lg p-2 text-text-secondary hover:bg-background hover:text-text dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                    <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary">
                        Management
                    </p>

                    {list.map((item) => {
                        const isActive =
                            item.link === "/admin"
                                ? pathname === "/admin"
                                : pathname.startsWith(item.link);

                        return (
                            <Link
                                key={item.link}
                                href={item.link}
                                onClick={onClose}
                                className={`
                                    flex cursor-pointer items-center gap-3
                                    rounded-lg px-3 py-2.5
                                    text-sm font-medium
                                    transition-colors
                                    ${isActive
                                        ? "bg-primary text-white"
                                        : "text-text-secondary hover:bg-background hover:text-text dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text"
                                    }
                                `}
                            >
                                {item.icon}

                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="border-t border-border p-4 dark:border-dark-border">
                    <p className="text-center text-xs text-text-secondary dark:text-dark-text-secondary">
                        Admin Dashboard
                    </p>
                </div>
            </aside>
        </>
    );
}