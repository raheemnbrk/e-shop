import { orderItem } from "@/types/orderTypes";
import { Package } from "lucide-react";

interface OrderItemsProps {
    items: orderItem[];
    title?: string;
}

export default function OrderItems({
    items,
    title = "Order Items",
}: OrderItemsProps) {
    return (
        <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border dark:border-dark-border">
                <h2 className="text-base font-semibold text-text dark:text-dark-text">
                    {title}
                </h2>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">
                    {items.length} {items.length === 1 ? "item" : "items"}
                </p>
            </div>

            <div className="divide-y divide-border dark:divide-dark-border">
                {items.map((item) => {
                    const unitPrice =
                        item.discount > 0
                            ? item.price * (1 - item.discount / 100)
                            : item.price;
                    const itemTotal = unitPrice * item.quantity;

                    return (
                        <div key={item.id} className="flex gap-4 p-4 sm:p-5">
                            <div className="flex size-16 sm:size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background dark:bg-dark-background border border-border dark:border-dark-border">
                                {item.productImage ? (
                                    <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <Package className="size-7 text-text-secondary dark:text-dark-text-secondary" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="font-medium text-text dark:text-dark-text line-clamp-2">
                                            {item.productName}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-text-secondary dark:text-dark-text-secondary">
                                            <span>Qty: {item.quantity}</span>
                                            <span className="size-1 rounded-full bg-border dark:bg-dark-border" />
                                            <span>${item.price.toFixed(2)} each</span>
                                            {item.discount > 0 && (
                                                <>
                                                    <span className="size-1 rounded-full bg-border dark:bg-dark-border" />
                                                    <span className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-950/40 px-2 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400">
                                                        -{item.discount}%
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-right shrink-0">
                                        <p className="font-semibold text-text dark:text-dark-text">
                                            ${itemTotal.toFixed(2)}
                                        </p>
                                        {item.discount > 0 && (
                                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary line-through">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}