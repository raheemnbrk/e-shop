"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Package, PackageSearch, ChevronRight, Calendar } from "lucide-react";
import { useGetMyOrders } from "@/lib/hooks/orders/useGetMyOrders";
import { orderStatus } from "@/types/orderTypes";
import { OrdersSkeleton } from "@/components/loading/orderSkeleton";
import Link from "next/link";

const statusFilters = [
    { value: "all", label: "All", status: undefined },
    { value: "PENDING", label: "Pending", status: "PENDING" },
    { value: "CONFIRMED", label: "Confirmed", status: "CONFIRMED" },
    { value: "PROCESSING", label: "Processing", status: "PROCESSING" },
    { value: "SHIPPED", label: "Shipped", status: "SHIPPED" },
    { value: "DELIVERED", label: "Delivered", status: "DELIVERED" },
    { value: "CANCELLED", label: "Cancelled", status: "CANCELLED" },
] as const;

const statuses: orderStatus[] = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
];

const statusColors: Record<orderStatus, string> = {
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

export default function OrdersList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageParam = Number(searchParams.get("page") ?? "1");
    const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

    const statusParam = searchParams.get("status");

    const status: orderStatus | undefined = statuses.includes(
        statusParam as orderStatus,
    )
        ? (statusParam as orderStatus)
        : undefined;

    const { data, isLoading } = useGetMyOrders({
        page,
        status,
    });

    const handleStatusChange = (newStatus: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newStatus === "all") {
            params.delete("status");
        } else {
            params.set("status", newStatus);
        }

        params.delete("page");

        router.push(
            params.toString() ? `${pathname}?${params.toString()}` : pathname,
        );
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newPage <= 1) {
            params.delete("page");
        } else {
            params.set("page", newPage.toString());
        }

        router.push(
            params.toString() ? `${pathname}?${params.toString()}` : pathname,
        );
    };

    const getStatusCount = (filterStatus?: orderStatus) => {
        if (!data) return 0;

        if (!filterStatus) {
            return data.totalOrders;
        }

        const statusCounts = Array.isArray(data.statusCounts)
            ? data.statusCounts
            : data.statusCounts
                ? [data.statusCounts]
                : [];

        return statusCounts.find((item) => item.status === filterStatus)?.count ?? 0;
    };

    if (isLoading) return <OrdersSkeleton />;

    return (
        <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {statusFilters.map((filter) => {
                    const isActive =
                        filter.status === undefined
                            ? status === undefined
                            : status === filter.status;

                    const count = getStatusCount(filter.status);

                    return (
                        <button
                            key={filter.value}
                            type="button"
                            onClick={() => handleStatusChange(filter.value)}
                            className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "border-primary bg-primary text-white shadow-sm"
                                    : "border-border dark:border-dark-border bg-card dark:bg-dark-card text-text dark:text-dark-text hover:border-primary/60 hover:text-primary"
                                }`}
                        >
                            {filter.label}
                            <span
                                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${isActive
                                        ? "bg-white/20 text-white"
                                        : "bg-background dark:bg-dark-background text-text-secondary dark:text-dark-text-secondary"
                                    }`}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {data?.orders.length ? (
                <div className="space-y-4">
                    {data.orders.map((order) => {
                        const totalItems = order.items.reduce(
                            (acc, item) => acc + item.quantity,
                            0,
                        );

                        return (
                            <div
                                key={order.id}
                                className="group rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/40"
                            >
                                <div className="flex flex-col gap-3 border-b border-border dark:border-dark-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between bg-background/50 dark:bg-dark-background/30">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                                Order
                                            </p>
                                            <p className="font-bold text-text dark:text-dark-text">
                                                #{order.orderNumber}
                                            </p>
                                        </div>

                                        <div className="hidden sm:block h-8 w-px bg-border dark:bg-dark-border" />

                                        <div className="hidden sm:flex items-center gap-1.5 text-sm text-text-secondary dark:text-dark-text-secondary">
                                            <Calendar className="size-3.5" />
                                            {new Date(order.createdAt).toLocaleDateString("en-GB", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusColors[order.status]}`}
                                        >
                                            {order.status}
                                        </span>

                                        <span className="text-xs text-text-secondary dark:text-dark-text-secondary sm:hidden">
                                            {new Date(order.createdAt).toLocaleDateString("en-GB")}
                                        </span>
                                    </div>
                                </div>

                                <div className="divide-y divide-border dark:divide-dark-border">
                                    {order.items.map((item) => {
                                        const hasDiscount = item.discount > 0;

                                        const unitPrice = hasDiscount
                                            ? item.price * (1 - item.discount / 100)
                                            : item.price;

                                        const originalTotal = item.price * item.quantity;
                                        const itemTotal = unitPrice * item.quantity;

                                        return (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-4 px-5 py-3.5"
                                            >
                                                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background dark:bg-dark-background border border-border dark:border-dark-border">
                                                    {item.productImage ? (
                                                        <img
                                                            src={item.productImage}
                                                            alt={item.productName}
                                                            className="size-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="size-6 text-text-secondary dark:text-dark-text-secondary" />
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-medium text-sm text-text dark:text-dark-text">
                                                        {item.productName}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-0.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                                                        <span>Qty {item.quantity}</span>
                                                        <span className="size-1 rounded-full bg-border dark:bg-dark-border" />
                                                        <span>${unitPrice.toFixed(2)} each</span>
                                                        {hasDiscount && (
                                                            <>
                                                                <span className="size-1 rounded-full bg-border dark:bg-dark-border" />
                                                                <span className="font-semibold text-red-500 dark:text-red-400">
                                                                    -{item.discount}%
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="text-right shrink-0">
                                                    <p className="font-semibold text-sm text-text dark:text-dark-text">
                                                        ${itemTotal.toFixed(2)}
                                                    </p>
                                                    {hasDiscount && (
                                                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary line-through">
                                                            ${originalTotal.toFixed(2)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col gap-3 border-t border-border dark:border-dark-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                                Items
                                            </p>
                                            <p className="text-sm font-semibold text-text dark:text-dark-text">
                                                {totalItems} {totalItems === 1 ? "unit" : "units"}
                                            </p>
                                        </div>

                                        <div className="h-8 w-px bg-border dark:bg-dark-border" />

                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                                Total
                                            </p>
                                            <p className="text-lg font-bold text-primary">
                                                ${order.total.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/my-orders/${order.orderNumber}`}
                                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primaryHover group/btn"
                                    >
                                        View Order
                                        <ChevronRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border dark:border-dark-border py-20 text-center">
                    <div className="relative mb-5">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
                        <div className="relative flex size-20 items-center justify-center rounded-full bg-card dark:bg-dark-card border border-border dark:border-dark-border">
                            <PackageSearch className="size-9 text-text-secondary dark:text-dark-text-secondary" />
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-text dark:text-dark-text mb-1.5">
                        No orders found
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary max-w-xs mb-6">
                        {status
                            ? `You don't have any ${status.toLowerCase()} orders.`
                            : "You haven't placed any orders yet."}
                    </p>

                    {status ? (
                        <button
                            onClick={() => handleStatusChange("all")}
                            className="inline-flex items-center gap-2 rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card px-5 py-2.5 text-sm font-semibold text-text dark:text-dark-text hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                            View all orders
                        </button>
                    ) : (
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primaryHover transition-colors"
                        >
                            Start shopping
                        </Link>
                    )}
                </div>
            )}

            {data?.pagination && data.pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        disabled={!data.pagination.hasPreviousPage}
                        onClick={() => handlePageChange(page - 1)}
                        className="cursor-pointer rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card px-4 py-2 text-sm font-medium text-text dark:text-dark-text transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        Page{" "}
                        <span className="font-semibold text-text dark:text-dark-text">
                            {data.pagination.currentPage}
                        </span>{" "}
                        of {data.pagination.totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={!data.pagination.hasNextPage}
                        onClick={() => handlePageChange(page + 1)}
                        className="cursor-pointer rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card px-4 py-2 text-sm font-medium text-text dark:text-dark-text transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}