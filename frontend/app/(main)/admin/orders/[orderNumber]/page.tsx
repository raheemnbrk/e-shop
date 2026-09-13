"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, PackageSearch, ArrowLeft } from "lucide-react";

import OrderDetailSkeleton from "@/components/loading/orderDetailSkeleton";
import { useGetOrder } from "@/lib/hooks/admin/orders/useGetOrder";
import OrderHeader from "@/components/features/dashboard/orderHeader";
import CustomerInfo from "@/components/features/dashboard/customerInfo";
import OrderSummary from "@/components/features/dashboard/orderSummary";
import OrderItems from "@/components/features/dashboard/orderItems";
import ShippingAddress from "@/components/features/dashboard/shippingAddress";

export default function AdminOrderPage() {
    const params = useParams();
    const orderNumber = params.orderNumber as string;

    const { data: order, isLoading, isError } = useGetOrder(orderNumber);

    if (isLoading) return <OrderDetailSkeleton />;

    if (isError || !order) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
                    <div className="relative flex size-24 items-center justify-center rounded-full bg-card dark:bg-dark-card border border-border dark:border-dark-border shadow-sm">
                        <PackageSearch className="size-11 text-text-secondary dark:text-dark-text-secondary" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-text dark:text-dark-text mb-2">
                    Order not found
                </h3>

                <p className="text-sm text-text-secondary dark:text-dark-text-secondary max-w-sm mb-6">
                    The order{" "}
                    <span className="font-mono font-semibold text-text dark:text-dark-text">
                        #{orderNumber}
                    </span>{" "}
                    doesn't exist or may have been removed.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Link
                        href="/admin/orders"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primaryHover transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Back to orders
                    </Link>

                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card px-5 py-2.5 text-sm font-semibold text-text dark:text-dark-text hover:border-primary hover:text-primary transition-colors"
                    >
                        Go to dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <nav className="flex items-center gap-1.5 text-sm">
                <Link
                    href="/admin"
                    className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                >
                    Dashboard
                </Link>
                <ChevronRight className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
                <Link
                    href="/admin/orders"
                    className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                >
                    Orders
                </Link>
                <ChevronRight className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
                <span className="font-medium text-text dark:text-dark-text">
                    #{order.orderNumber}
                </span>
            </nav>

            <OrderHeader order={order} />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
                <div className="flex flex-col gap-6">
                    <OrderItems items={order.items} title="Order Items" />
                    <ShippingAddress address={order.address} />
                </div>

                <div className="flex flex-col gap-4 lg:sticky lg:top-20">
                    <CustomerInfo order={order} showEmail />
                    <OrderSummary
                        title="Summary"
                        subtotal={order.subtotal}
                        discount={order.discount}
                        shipping={order.shippingCost}
                        total={order.total}
                        showShipping
                    />
                </div>
            </div>
        </div>
    );
}