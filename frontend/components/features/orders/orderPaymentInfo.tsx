import { CreditCard } from "lucide-react";
import type { Order } from "@/types/orderTypes";

interface OrderPaymentInfoProps {
    order: Order;
}

export default function OrderPaymentInfo({
    order,
}: OrderPaymentInfoProps) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
            <div className="mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />

                <h2 className="font-semibold text-text dark:text-dark-text">
                    Payment Information
                </h2>
            </div>

            <div className="space-y-4 text-sm">
                <div>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        Payment Method
                    </p>

                    <p className="mt-1 font-medium text-text dark:text-dark-text">
                        {order.paymentMethod === "ONLINE"
                            ? "Online Payment"
                            : "Cash on Delivery"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        Payment Status
                    </p>

                    <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${order.paymentStatus === "PAID"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                    >
                        {order.paymentStatus === "PAID"
                            ? "Paid"
                            : "Unpaid"}
                    </span>
                </div>
            </div>
        </div>
    );
}