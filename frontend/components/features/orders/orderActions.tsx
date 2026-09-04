import {
    CircleAlert,
    RotateCcw,
    Star,
    Truck,
} from "lucide-react";
import type { Order } from "@/types/orderTypes";

interface OrderActionsProps {
    order: Order;
}

export default function OrderActions({
    order,
}: OrderActionsProps) {
    const canTrack = order.status === "SHIPPED";
    const canBuyAgain = order.status === "DELIVERED";
    const canReview = order.status === "DELIVERED";

    return (
        <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
            <h2 className="mb-4 font-semibold text-text dark:text-dark-text">
                More Actions
            </h2>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {canTrack && (
                    <button
                        type="button"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text transition hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text"
                    >
                        <Truck className="h-4 w-4" />
                        Track Order
                    </button>
                )}

                {canBuyAgain && (
                    <button
                        type="button"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text transition hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Buy Again
                    </button>
                )}

                {canReview && (
                    <button
                        type="button"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text transition hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text"
                    >
                        <Star className="h-4 w-4" />
                        Leave Review
                    </button>
                )}

                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text transition hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text"
                >
                    <CircleAlert className="h-4 w-4" />
                    Contact Support
                </button>
            </div>
        </div>
    );
}