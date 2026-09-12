"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    ShoppingBag,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle2,
    XCircle,
    PackageSearch,
    Store,
    XCircle as XCircleIcon,
} from "lucide-react";
import { useGetCustomerProfile } from "@/lib/hooks/admin/users/useGetCustomerProfile";

export default function AdminUserPage() {
    const params = useParams();
    const userId = params.userId as string;
    const { data, isLoading, isError } = useGetCustomerProfile(userId);

    if (isLoading) return <UserProfileSkeleton />;

    if (isError || !data?.result) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-border dark:bg-dark-border mb-5">
                    <PackageSearch className="size-10 text-text-secondary dark:text-dark-text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2">
                    User not found
                </h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-6">
                    We couldn't find this user.
                </p>
                <Link
                    href="/admin/users"
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primaryHover transition-colors"
                >
                    Back to users
                </Link>
            </div>
        );
    }

    const { user, stats, recentOrders, cancelledOrders } = data.result;

    const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();
    const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const roleColors: Record<string, string> = {
        ADMIN: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        SELLER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        CUSTOMER: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    };

    const statCards = [
        {
            label: "Total Orders",
            value: stats.totalOrders,
            icon: ShoppingBag,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-950/40",
        },
        {
            label: "Total Spent",
            value: `$${stats.totalSpent.toLocaleString()}`,
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-50 dark:bg-emerald-950/40",
        },
        {
            label: "Avg. Order",
            value: `$${stats.avgOrderValue.toFixed(2)}`,
            icon: TrendingUp,
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-950/40",
        },
        {
            label: "Cancelled",
            value: cancelledOrders,
            icon: XCircleIcon,
            color: "text-red-500",
            bg: "bg-red-50 dark:bg-red-950/40",
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <Link
                href="/admin/users"
                className="inline-flex w-fit items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
            >
                <ArrowLeft className="size-4" />
                Back to users
            </Link>

            <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="shrink-0">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.firstName}
                                className="size-20 rounded-2xl object-cover border border-border dark:border-dark-border"
                            />
                        ) : (
                            <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20 text-2xl font-bold text-primary">
                                {initials || "?"}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-text dark:text-dark-text">
                                {user.firstName} {user.lastName}
                            </h1>

                            <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleColors[user.role] ?? roleColors.CUSTOMER}`}
                            >
                                {user.role}
                            </span>

                            {user.isVerified ? (
                                <span className="flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-950/40 px-2.5 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="size-3" />
                                    Verified
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-950/40 px-2.5 py-0.5 text-xs font-semibold text-red-500 dark:text-red-400">
                                    <XCircle className="size-3" />
                                    Unverified
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                            <span className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                                <Mail className="size-4 text-primary shrink-0" />
                                {user.email}
                            </span>

                            <span className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                                <Phone className="size-4 text-primary shrink-0" />
                                {user.phoneNumber || "_"}
                            </span>

                            <span className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                                <Calendar className="size-4 text-primary shrink-0" />
                                Joined {joinedDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary">
                                {stat.label}
                            </p>
                            <div
                                className={`flex size-9 items-center justify-center rounded-lg ${stat.bg}`}
                            >
                                <stat.icon className={`size-4 ${stat.color}`} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-text dark:text-dark-text">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {user.role === "SELLER" && user.Seller && (
                <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                            <Store className="size-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-text dark:text-dark-text">
                                Store Information
                            </h2>
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">
                                Seller's store details
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">
                                Store name
                            </p>
                            <p className="text-sm font-medium text-text dark:text-dark-text">
                                {user.Seller.storeName}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">
                                Store slug
                            </p>
                            <p className="text-sm font-medium text-text dark:text-dark-text">
                                {user.Seller.storeSlug}
                            </p>
                        </div>
                    </div>

                    <Link
                        href={`/admin/sellers/${user.Seller.storeSlug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                        View seller profile
                    </Link>
                </div>
            )}

            {user.role !== "ADMIN" && (
                <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-dark-border">
                        <div>
                            <h2 className="text-base font-semibold text-text dark:text-dark-text">
                                Recent Orders
                            </h2>
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">
                                {recentOrders.length}{" "}
                                {recentOrders.length === 1 ? "order" : "orders"} found
                            </p>
                        </div>

                        {recentOrders.length > 0 && (
                            <Link
                                href={`/admin/orders?userId=${user.id}`}
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                View all
                            </Link>
                        )}
                    </div>

                    {recentOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="flex size-14 items-center justify-center rounded-full bg-border dark:bg-dark-border mb-3">
                                <ShoppingBag className="size-6 text-text-secondary dark:text-dark-text-secondary" />
                            </div>
                            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                This user has no orders yet.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border dark:border-dark-border bg-background dark:bg-dark-background">
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                            Order
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                            Total
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-b border-border dark:border-dark-border last:border-none hover:bg-background dark:hover:bg-dark-background/50 transition-colors"
                                        >
                                            <td className="px-4 py-3">
                                                <Link
                                                    href={`/admin/orders/${order.orderNumber}`}
                                                    className="font-medium text-text dark:text-dark-text hover:text-primary transition-colors"
                                                >
                                                    #{order.orderNumber}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-text-secondary dark:text-dark-text-secondary">
                                                {new Date(order.createdAt).toLocaleDateString("en-GB")}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-text dark:text-dark-text">
                                                ${order.total.toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function UserProfileSkeleton() {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            <div className="h-4 w-32 bg-border dark:bg-dark-border rounded" />

            <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="size-20 shrink-0 rounded-2xl bg-border dark:bg-dark-border" />
                    <div className="flex-1 w-full space-y-2.5">
                        <div className="h-6 w-48 bg-border dark:bg-dark-border rounded" />
                        <div className="flex gap-2">
                            <div className="h-5 w-16 bg-border dark:bg-dark-border rounded-full" />
                            <div className="h-5 w-20 bg-border dark:bg-dark-border rounded-full" />
                        </div>
                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                            <div className="h-4 w-44 bg-border dark:bg-dark-border rounded" />
                            <div className="h-4 w-32 bg-border dark:bg-dark-border rounded" />
                            <div className="h-4 w-36 bg-border dark:bg-dark-border rounded" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="h-3 w-20 bg-border dark:bg-dark-border rounded" />
                            <div className="size-9 rounded-lg bg-border dark:bg-dark-border" />
                        </div>
                        <div className="h-7 w-16 bg-border dark:bg-dark-border rounded" />
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border dark:border-dark-border space-y-2">
                    <div className="h-5 w-32 bg-border dark:bg-dark-border rounded" />
                    <div className="h-3 w-24 bg-border dark:bg-dark-border rounded" />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border dark:border-dark-border bg-background dark:bg-dark-background">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <th key={i} className="px-4 py-3 text-left">
                                        <div className="h-3 w-20 bg-border dark:bg-dark-border rounded" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-border dark:border-dark-border last:border-none"
                                >
                                    <td className="px-4 py-3">
                                        <div className="h-4 w-24 bg-border dark:bg-dark-border rounded" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-4 w-20 bg-border dark:bg-dark-border rounded" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-4 w-16 bg-border dark:bg-dark-border rounded" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-6 w-20 bg-border dark:bg-dark-border rounded-full" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}