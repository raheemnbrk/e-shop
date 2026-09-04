import { Package, ShoppingCart } from "lucide-react";
import type { Order } from "@/types/orderTypes";

interface OrderItemsProps {
    order: Order;
}

export default function OrderItems({ order }: OrderItemsProps) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
            <div className="mb-5 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />

                <h2 className="font-semibold text-text dark:text-dark-text">
                    Items Ordered
                </h2>
            </div>

            <div className="divide-y divide-border dark:divide-dark-border">
                {order.items.map((item) => {
                    const itemTotal =
                        item.price * item.quantity;

                    return (
                        <div
                            key={item.id}
                            className="flex gap-4 py-4 first:pt-0 last:pb-0"
                        >
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background dark:bg-dark-background">
                                {item.productImage ? (
                                    <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Package className="h-8 w-8 text-text-secondary dark:text-dark-text-secondary" />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="font-medium text-text dark:text-dark-text">
                                    {item.productName}
                                </h3>

                                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                                    Quantity: {item.quantity}
                                </p>

                                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                                    ${item.price.toFixed(2)} each
                                </p>

                                {item.discount > 0 && (
                                    <span className="mt-2 inline-flex rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                                        {item.discount}% OFF
                                    </span>
                                )}
                            </div>

                            <div className="text-right">
                                <p className="font-semibold text-text dark:text-dark-text">
                                    ${itemTotal.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}