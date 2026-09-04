import { CreditCard } from "lucide-react";
import type { Order } from "@/types/orderTypes";

interface OrderSummaryProps {
    order: Order | undefined;
}

export default function OrderSummary({
    order,
}: OrderSummaryProps) {
    if (!order) {
        return null;
    }

    return (
        <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
            <div className="mb-5 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />

                <h2 className="font-semibold text-text dark:text-dark-text">
                    Order Summary
                </h2>
            </div>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-text-secondary dark:text-dark-text-secondary">
                        Subtotal
                    </span>

                    <span className="text-text dark:text-dark-text">
                        ${order.subtotal.toFixed(2)}
                    </span>
                </div>

                {order.discount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-text-secondary dark:text-dark-text-secondary">
                            Discount
                        </span>

                        <span className="text-red-500">
                            -${order.discount.toFixed(2)}
                        </span>
                    </div>
                )}

                <div className="flex justify-between">
                    <span className="text-text-secondary dark:text-dark-text-secondary">
                        Shipping
                    </span>

                    <span className="text-text dark:text-dark-text">
                        ${order.shippingCost.toFixed(2)}
                    </span>
                </div>

                <div className="border-t border-border pt-4 dark:border-dark-border">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-text dark:text-dark-text">
                            Total
                        </span>

                        <span className="text-xl font-bold text-primary">
                            ${order.total.toFixed(2)}
                        </span>
                    </div>

                    {order.discount > 0 && (
                        <p className="mt-2 text-sm text-green-500">
                            You saved ${order.discount.toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}