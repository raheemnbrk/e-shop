"use client";

import { Download, X } from "lucide-react";
import type { Order } from "@/types/orderTypes";
import { useCancelOrder } from "@/lib/hooks/orders/useCancelOrder";
import { getOrderInvoiceApi } from "@/lib/api/ordersApi";
import { toast } from "sonner";
import { useState } from "react";

interface OrderHeaderProps {
    order: Order;
}

export default function OrderHeader({ order }: OrderHeaderProps) {

    const [invoiceLoading, setInvoiceLoading] = useState(false)

    const handleViewInvoice = async () => {
        setInvoiceLoading(true)
        try {
            const blob = await getOrderInvoiceApi(order.orderNumber)
            const url = window.URL.createObjectURL(blob)
            window.open(url, "_blank")
        } catch {
            toast.error("Failed to load invoice.")
        } finally {
            setInvoiceLoading(false)
        }
    }

    const canCancel =
        order.status === "PENDING" ||
        order.status === "CONFIRMED";

    const { cancelOrder, cancelling } = useCancelOrder()

    return (
        <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-xl font-bold text-text dark:text-dark-text">
                            Order #{order.orderNumber}
                        </h1>

                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {order.status}
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${order.paymentStatus === "PAID"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-yellow-500/10 text-yellow-500"
                                }`}
                        >
                            Payment:{" "}
                            {order.paymentStatus === "PAID"
                                ? "Paid"
                                : "Unpaid"}
                        </span>
                    </div>

                    <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            },
                        )}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={handleViewInvoice}
                        disabled={invoiceLoading}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text transition hover:border-primary hover:text-primary dark:hover:text-primary dark:hover:border-primary dark:border-dark-border dark:text-dark-text disabled:opacity-50"
                    >
                        <Download className="h-4 w-4" />
                        {invoiceLoading ? "Loading..." : "Download Invoice"}
                    </button>

                    <button
                        type="button"
                        disabled={!canCancel || cancelling || order.status === "CANCELLED"}
                        onClick={() => cancelOrder(order.id)}
                        className="flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                        <X className="h-4 w-4" />
                        Cancel Order
                    </button>
                </div>
            </div>
        </div>
    );
}