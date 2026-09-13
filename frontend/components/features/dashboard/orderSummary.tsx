import { Receipt } from "lucide-react";

interface OrderSummaryProps {
    subtotal: number;
    discount: number;
    shipping?: number;
    total: number;
    title?: string;
    showShipping?: boolean;
}

export default function OrderSummary({
    subtotal,
    discount,
    shipping = 0,
    total,
    title = "Summary",
    showShipping = false,
}: OrderSummaryProps) {
    return (
        <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5">
            <div className="flex items-center gap-3 mb-5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                    <Receipt className="size-4 text-primary" />
                </div>
                <h2 className="text-base font-semibold text-text dark:text-dark-text">
                    {title}
                </h2>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary dark:text-dark-text-secondary">
                        Subtotal
                    </span>
                    <span className="font-medium text-text dark:text-dark-text">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>

                {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary dark:text-dark-text-secondary">
                            Discount
                        </span>
                        <span className="font-medium text-red-500 dark:text-red-400">
                            -${discount.toFixed(2)}
                        </span>
                    </div>
                )}

                {showShipping && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary dark:text-dark-text-secondary">
                            Shipping
                        </span>
                        <span className="font-medium text-text dark:text-dark-text">
                            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                )}

                <div className="pt-3 mt-3 border-t border-border dark:border-dark-border flex items-center justify-between">
                    <span className="text-sm font-semibold text-text dark:text-dark-text">
                        Total
                    </span>
                    <span className="text-xl font-bold text-primary">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}