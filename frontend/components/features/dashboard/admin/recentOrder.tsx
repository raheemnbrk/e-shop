"use client";

import RecentOrdersSkeleton from "@/components/loading/dashboard/recentOrdersSkeleton";
import { Order } from "@/types/orderTypes";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

type OrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";


const statusStyles: Record<OrderStatus, string> = {
    PENDING:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    CONFIRMED:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    PROCESSING:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    SHIPPED:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    DELIVERED:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    CANCELLED:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function formatPrice(price: number) {
    return `$${price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

interface recentOrdersProps {
    orders: Order[];
    isLoading: boolean
}

export default function RecentOrders({ orders, isLoading }: recentOrdersProps) {
    const router = useRouter();

    if (isLoading) return <RecentOrdersSkeleton />

    return (
        <div className="rounded-xl border border-border bg-card shadow-sm dark:border-dark-border dark:bg-dark-card">
            <div className="flex items-center justify-between border-b border-border p-5 dark:border-dark-border">
                <div>
                    <h2 className="text-lg font-semibold text-text dark:text-dark-text">
                        Recent Orders
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                        Latest orders placed in your store
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => router.push("/admin/orders")}
                    className="cursor-pointer text-sm font-medium text-primary hover:text-primaryHover"
                >
                    View all
                </button>
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border text-left dark:border-dark-border">
                            <th className="px-5 py-3 text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                                Order
                            </th>

                            <th className="px-5 py-3 text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                                Customer
                            </th>

                            <th className="px-5 py-3 text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                                Items
                            </th>

                            <th className="px-5 py-3 text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                                Total
                            </th>

                            <th className="px-5 py-3 text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                                Status
                            </th>

                            <th className="px-5 py-3 text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                                Date
                            </th>

                            <th className="px-5 py-3 text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-b border-border last:border-0 dark:border-dark-border"
                            >
                                <td className="px-5 py-4 text-sm font-medium text-text dark:text-dark-text">
                                    {order.orderNumber}
                                </td>

                                <td className="px-5 py-4 text-sm text-text dark:text-dark-text">
                                    <div className="flex items-center gap-2">
                                        {order.user?.image ? (<img
                                            className="w-6 h-6 rounded-full"
                                            src={order.user.image}
                                            alt={order.user.firstName ?? "User"}
                                        />) : (<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-200 text-sm font-semibold text-primary border border-primary/10">
                                            {order.user?.firstName?.[0]?.toUpperCase()}
                                            {order.user?.lastName?.[0]?.toUpperCase()}
                                        </div>)}
                                        <div className="flex gap-1" >
                                            <span>{order.user?.firstName ?? "Unknown user"}</span>
                                            <span>{order.user?.lastName ?? "Unknown user"}</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                                    {order.items?.length ?? 0}
                                </td>

                                <td className="px-5 py-4 text-sm font-medium text-text dark:text-dark-text">
                                    {formatPrice(order.total)}
                                </td>

                                <td className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                                    >
                                        {order.status.charAt(0) +
                                            order.status.slice(1).toLowerCase()}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                                    {formatDate(order.createdAt)}
                                </td>

                                <td className="px-5 py-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.push(
                                                `/admin/orders/${order.orderNumber}`
                                            )
                                        }
                                        className="cursor-pointer rounded-md p-2 text-text-secondary transition hover:bg-muted hover:text-text dark:text-dark-text-secondary dark:hover:bg-dark-muted dark:hover:text-dark-text"
                                        title="View order"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="divide-y divide-border md:hidden dark:divide-dark-border">
                {orders.map((order) => (
                    <div key={order.id} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-medium text-text dark:text-dark-text">
                                    {order.orderNumber}
                                </p>

                                <div className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                                    <div className="flex items-center gap-2">
                                        {order.user?.image ? (<img
                                            className="w-6 h-6 rounded-full"
                                            src={order.user.image}
                                            alt={order.user.firstName ?? "User"}
                                        />) : (<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-200 text-sm font-semibold text-primary border border-primary/10">
                                            {order.user?.firstName?.[0]?.toUpperCase()}
                                            {order.user?.lastName?.[0]?.toUpperCase()}
                                        </div>)}
                                        <div className="flex gap-1" >
                                            <span>{order.user?.firstName ?? "Unknown user"}</span>
                                            <span>{order.user?.lastName ?? "Unknown user"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                            >
                                {order.status.charAt(0) +
                                    order.status.slice(1).toLowerCase()}
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                    {order.items?.length ?? 0} items
                                </p>

                                <p className="mt-1 font-semibold text-text dark:text-dark-text">
                                    {formatPrice(order.total)}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                    {formatDate(order.createdAt)}
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push(
                                            `/admin/orders/${order.orderNumber}`
                                        )
                                    }
                                    className="mt-2 cursor-pointer text-sm font-medium text-primary hover:text-primaryHover"
                                >
                                    View order
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {orders.length === 0 && (
                <div className="p-10 text-center">
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        No recent orders found.
                    </p>
                </div>
            )}
        </div>
    );
}