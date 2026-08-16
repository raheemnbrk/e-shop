// components/features/checkout/checkoutDelivery.tsx
"use client";

import { Truck, Zap } from "lucide-react";

interface Props {
    deliveryMethod: "STANDARD" | "EXPRESS";
    onSelectDelivery: (method: "STANDARD" | "EXPRESS") => void;
}

const methods = [
    {
        id: "STANDARD" as const,
        label: "Standard",
        description: "5–7 business days",
        price: "Free",
        icon: Truck,
    },
    {
        id: "EXPRESS" as const,
        label: "Express",
        description: "1–2 business days",
        price: "$9.99",
        icon: Zap,
    },
];

export default function CheckoutDelivery({ deliveryMethod, onSelectDelivery }: Props) {
    return (
        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shrink-0">2</div>
                <h2 className="text-sm font-semibold text-text dark:text-dark-text">Delivery method</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {methods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = deliveryMethod === method.id;
                    return (
                        <button
                            key={method.id}
                            onClick={() => onSelectDelivery(method.id)}
                            className={`flex items-center gap-3 rounded-xl border-2 p-3.5 transition-all cursor-pointer ${isSelected
                                ? "border-primary bg-blue-50 dark:bg-blue-950"
                                : "border-border dark:border-dark-border hover:border-primary/50"
                                }`}
                        >
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isSelected ? "bg-blue-100 dark:bg-blue-900" : "bg-background dark:bg-dark-background"
                                }`}>
                                <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-text-secondary dark:text-dark-text-secondary"}`} />
                            </div>
                            <div className="text-left flex-1">
                                <p className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-text dark:text-dark-text"}`}>
                                    {method.label}
                                </p>
                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{method.description}</p>
                            </div>
                            <span className={`text-sm font-bold ml-auto ${isSelected ? "text-primary" : "text-text dark:text-dark-text"}`}>
                                {method.price}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}