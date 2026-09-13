import { Package, ShoppingCart, TrendingDown } from "lucide-react";
import type { Order } from "@/types/orderTypes";

interface OrderItemsProps {
    order: Order;
    title?: string;
}

export default function OrderItems({
    order,
    title = "Items Ordered",
}: OrderItemsProps) {
    const totalItems = order.items.reduce((acc, i) => acc + i.quantity, 0);

    return (
        <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border dark:border-dark-border">
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <ShoppingCart className="size-4 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-text dark:text-dark-text">
                            {title}
                        </h2>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">
                            {order.items.length}{" "}
                            {order.items.length === 1 ? "product" : "products"} ·{" "}
                            {totalItems} {totalItems === 1 ? "unit" : "units"}
                        </p>
                    </div>
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
                    const saved = originalTotal - itemTotal;

                    return (
                        <div
                            key={item.id}
                            className="flex gap-4 p-4 sm:p-5 transition-colors hover:bg-background/50 dark:hover:bg-dark-background/30"
                        >
                            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background dark:bg-dark-background border border-border dark:border-dark-border">
                                {item.productImage ? (
                                    <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <Package className="size-8 text-text-secondary dark:text-dark-text-secondary" />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-medium text-text dark:text-dark-text line-clamp-2">
                                            {item.productName}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                                            <span className="inline-flex items-center gap-1.5">
                                                <span className="text-xs uppercase tracking-wider font-medium">
                                                    Qty
                                                </span>
                                                <span className="font-semibold text-text dark:text-dark-text">
                                                    {item.quantity}
                                                </span>
                                            </span>

                                            <span className="size-1 rounded-full bg-border dark:bg-dark-border" />

                                            <span className="inline-flex items-center gap-1.5">
                                                <span className="text-xs uppercase tracking-wider font-medium">
                                                    Unit
                                                </span>
                                                {hasDiscount ? (
                                                    <span className="flex items-baseline gap-1.5">
                                                        <span className="font-semibold text-text dark:text-dark-text">
                                                            ${unitPrice.toFixed(2)}
                                                        </span>
                                                        <span className="text-xs line-through opacity-70">
                                                            ${item.price.toFixed(2)}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span className="font-semibold text-text dark:text-dark-text">
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                )}
                                            </span>
                                        </div>

                                        {hasDiscount && (
                                            <div className="flex items-center gap-2 mt-2.5">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-950/40 px-2 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400">
                                                    <TrendingDown className="size-3" />
                                                    {item.discount}% OFF
                                                </span>
                                                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                                    You save ${saved.toFixed(2)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-right shrink-0">
                                        <p className="text-lg font-bold text-text dark:text-dark-text">
                                            ${itemTotal.toFixed(2)}
                                        </p>
                                        {hasDiscount && (
                                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary line-through">
                                                ${originalTotal.toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-border dark:border-dark-border bg-background/50 dark:bg-dark-background/30">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        Items total
                    </span>
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        ({totalItems} {totalItems === 1 ? "unit" : "units"})
                    </span>
                </div>
                <span className="text-base font-bold text-text dark:text-dark-text">
                    $
                    {order.items
                        .reduce((acc, item) => {
                            const unit =
                                item.discount > 0
                                    ? item.price * (1 - item.discount / 100)
                                    : item.price;
                            return acc + unit * item.quantity;
                        }, 0)
                        .toFixed(2)}
                </span>
            </div>
        </div>
    );
}