import { MapPin, Truck } from "lucide-react";
import type { Order } from "@/types/orderTypes";

interface OrderDeliveryInfoProps {
    order: Order;
}

export default function OrderDeliveryInfo({
    order,
}: OrderDeliveryInfoProps) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
            <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />

                <h2 className="font-semibold text-text dark:text-dark-text">
                    Delivery Information
                </h2>
            </div>

            {order.address && (
                <div
                    className="space-y-1 text-sm text-text-secondary dark:text-dark-text-secondary"
                >
                    <p className="font-medium text-text dark:text-dark-text">
                        {order.address.street}
                    </p>

                    <p>
                        {order.address.city}, {order.address.state}
                    </p>

                    <p>
                        {order.address.country} {order.address.zipCode}
                    </p>
                </div>
            )}

            <div className="mt-5 border-t border-border pt-4 dark:border-dark-border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                            Delivery Method
                        </p>

                        <p className="mt-1 text-sm font-medium text-text dark:text-dark-text">
                            {order.deliveryMethod === "EXPRESS"
                                ? "Express Delivery"
                                : "Standard Delivery"}
                        </p>
                    </div>

                    <Truck className="h-5 w-5 text-primary" />
                </div>
            </div>
        </div>
    );
}