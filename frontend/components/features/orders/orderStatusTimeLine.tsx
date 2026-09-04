import { Check, Package, Truck } from "lucide-react";
import type { orderStatus } from "@/types/orderTypes";

interface OrderStatusTimelineProps {
    status: orderStatus;
}

const statusSteps: {
    status: orderStatus;
    label: string;
}[] = [
        {
            status: "PENDING",
            label: "Order Placed",
        },
        {
            status: "CONFIRMED",
            label: "Confirmed",
        },
        {
            status: "PROCESSING",
            label: "Processing",
        },
        {
            status: "SHIPPED",
            label: "Shipped",
        },
        {
            status: "DELIVERED",
            label: "Delivered",
        },
    ];

const statusOrder: orderStatus[] = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
];

export default function OrderStatusTimeline({
    status,
}: OrderStatusTimelineProps) {
    const currentStatusIndex = statusOrder.indexOf(status);

    const getIcon = (stepStatus: orderStatus) => {
        if (
            stepStatus === "SHIPPED" ||
            stepStatus === "DELIVERED"
        ) {
            return <Truck className="h-4 w-4" />;
        }

        if (stepStatus === "PROCESSING") {
            return <Package className="h-4 w-4" />;
        }

        return <Check className="h-4 w-4" />;
    };

    return (
        <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
            <div className="mb-6 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />

                <h2 className="font-semibold text-text dark:text-dark-text">
                    Order Status
                </h2>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-162">
                    <div className="relative flex justify-between">
                        <div className="absolute left-[10%] right-[10%] top-4 h-0.5 bg-border dark:bg-dark-border">
                            <div
                                className="h-full bg-primary transition-all"
                                style={{
                                    width:
                                        currentStatusIndex <= 0
                                            ? "0%"
                                            : `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                                }}
                            />
                        </div>

                        {statusSteps.map((step, index) => {
                            const completed =
                                index <= currentStatusIndex;

                            const current =
                                index === currentStatusIndex;

                            return (
                                <div
                                    key={step.status}
                                    className="relative z-10 flex w-1/5 flex-col items-center"
                                >
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${completed
                                                ? "border-primary bg-primary text-white"
                                                : "border-border bg-card text-text-secondary dark:border-dark-border dark:bg-dark-card dark:text-dark-text-secondary"
                                            } ${current
                                                ? "ring-4 ring-primary/10"
                                                : ""
                                            }`}
                                    >
                                        {completed ? (
                                            getIcon(step.status)
                                        ) : (
                                            <span className="h-2 w-2 rounded-full bg-current" />
                                        )}
                                    </div>

                                    <p
                                        className={`mt-3 text-center text-xs font-medium ${completed
                                                ? "text-text dark:text-dark-text"
                                                : "text-text-secondary dark:text-dark-text-secondary"
                                            }`}
                                    >
                                        {step.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}