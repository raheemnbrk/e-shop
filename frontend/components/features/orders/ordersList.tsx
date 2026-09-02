"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Package } from "lucide-react";
import { useGetMyOrders } from "@/lib/hooks/orders/useGetMyOrders";
import { orderStatus } from "@/types/orderTypes";
import { OrdersSkeleton } from "@/components/loading/orderSkeleton";

const statusFilters = [
    {
        value: "all",
        label: "All",
        status: undefined,
    },
    {
        value: "PENDING",
        label: "Pending",
        status: "PENDING",
    },
    {
        value: "CONFIRMED",
        label: "Confirmed",
        status: "CONFIRMED",
    },
    {
        value: "PROCESSING",
        label: "Processing",
        status: "PROCESSING",
    },
    {
        value: "SHIPPED",
        label: "Shipped",
        status: "SHIPPED",
    },
    {
        value: "DELIVERED",
        label: "Delivered",
        status: "DELIVERED",
    },
    {
        value: "CANCELLED",
        label: "Cancelled",
        status: "CANCELLED",
    },
] as const;

const statuses: orderStatus[] = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
];

export default function OrdersList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageParam = Number(searchParams.get("page") ?? "1");
    const page =
        Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

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
            params.toString()
                ? `${pathname}?${params.toString()}`
                : pathname,
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
            params.toString()
                ? `${pathname}?${params.toString()}`
                : pathname,
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

        return (
            statusCounts.find(
                (item) => item.status === filterStatus,
            )?.count ?? 0
        );
    };


    if(isLoading)return <OrdersSkeleton/>

    return (
        <div className="space-y-6">
            <div className="flex gap-2 overflow-x-scroll">
                {statusFilters.map((filter) => {
                    const isActive =
                        filter.status === undefined
                            ? status === undefined
                            : status === filter.status;

                    return (
                        <button
                            key={filter.value}
                            type="button"
                            onClick={() =>
                                handleStatusChange(filter.value)
                            }
                            className={`flex items-center cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition ${isActive
                                    ? "border-primary bg-primary text-white"
                                    : "border-border bg-card text-text hover:border-primary dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
                                }`}
                        >
                            {filter.label} (
                            {getStatusCount(filter.status)}
                            )
                        </button>
                    );
                })}
            </div>

            {isLoading ? null : data?.orders.length ? (
                <div className="space-y-4">
                    {data.orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card"
                        >
                            <div className="mb-4 flex flex-col gap-3 border-b border-border pb-4 dark:border-dark-border sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                        Order
                                    </p>

                                    <p className="font-semibold text-text dark:text-dark-text">
                                        #{order.orderNumber}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                        {order.status}
                                    </span>

                                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                        {new Date(
                                            order.createdAt,
                                        ).toLocaleDateString("en-GB")}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background dark:bg-dark-background">
                                            {item.productImage ? (
                                                <img
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <Package className="h-7 w-7 text-text-secondary dark:text-dark-text-secondary" />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium text-text dark:text-dark-text">
                                                {item.productName}
                                            </p>

                                            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-medium text-text dark:text-dark-text">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 dark:border-dark-border sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                        Total
                                    </span>

                                    <p className="text-lg font-bold text-text dark:text-dark-text">
                                        ${order.total.toFixed(2)}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push(
                                            `/orders/${order.orderNumber}`,
                                        )
                                    }
                                    className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryHover"
                                >
                                    View Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 dark:border-dark-border dark:bg-dark-card">
                    <Package className="mb-4 h-12 w-12 text-text-secondary dark:text-dark-text-secondary" />

                    <h3 className="text-lg font-semibold text-text dark:text-dark-text">
                        No orders found
                    </h3>

                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                        You don't have any orders with this status.
                    </p>
                </div>
            )}

            {data?.pagination &&
                data.pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            disabled={
                                !data.pagination.hasPreviousPage
                            }
                            onClick={() =>
                                handlePageChange(page - 1)
                            }
                            className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border dark:text-dark-text"
                        >
                            Previous
                        </button>

                        <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                            Page {data.pagination.currentPage} of{" "}
                            {data.pagination.totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={!data.pagination.hasNextPage}
                            onClick={() =>
                                handlePageChange(page + 1)
                            }
                            className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border dark:text-dark-text"
                        >
                            Next
                        </button>
                    </div>
                )}
        </div>
    );
}