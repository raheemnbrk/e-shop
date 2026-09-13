"use client";

import { Calendar, Hash, Package, ChevronDown } from "lucide-react";
import { Order } from "@/types/orderTypes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors: Record<string, string> = {
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

const editableStatuses = ["CONFIRMED", "PROCESSING", "CANCELLED"] as const;

interface OrderHeaderProps {
    order: Order;
    onStatusChange?: (status: string) => void;
    isUpdating?: boolean;
    editable?: boolean;
}

export default function OrderHeader({
    order,
    onStatusChange,
    isUpdating,
    editable = false,
}: OrderHeaderProps) {
    const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                        <Package className="size-6 text-primary" />
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <Hash className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
                            <p className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                                Order Number
                            </p>
                        </div>
                        <p className="text-xl font-bold text-text dark:text-dark-text">
                            {order.orderNumber}
                        </p>
                    </div>

                    <div className="hidden sm:block h-10 w-px bg-border dark:bg-dark-border" />

                    <div>
                        <div className="flex items-center gap-2">
                            <Calendar className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
                            <p className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                                Placed on
                            </p>
                        </div>
                        <p className="text-sm font-semibold text-text dark:text-dark-text">
                            {orderDate}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span
                        className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${statusColors[order.status]}`}
                    >
                        {order.status}
                    </span>

                    {editable && onStatusChange && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    disabled={isUpdating}
                                    className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background px-3 py-1.5 text-sm font-medium text-text dark:text-dark-text transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Update
                                    <ChevronDown className="size-3.5" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="bg-card dark:bg-dark-card border-border dark:border-dark-border"
                            >
                                <DropdownMenuLabel className="text-text-secondary dark:text-dark-text-secondary text-xs">
                                    Change status
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-border dark:bg-dark-border" />
                                {editableStatuses.map((status) => (
                                    <DropdownMenuItem
                                        key={status}
                                        disabled={status === order.status}
                                        onClick={() => onStatusChange(status)}
                                        className="cursor-pointer capitalize text-text dark:text-dark-text data-highlighted:bg-primary data-highlighted:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        {status.charAt(0) + status.slice(1).toLowerCase()}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </div>
    );
}