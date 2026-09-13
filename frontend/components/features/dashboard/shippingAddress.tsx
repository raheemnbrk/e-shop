import { Address } from "@/types/addressType";
import { MapPin, Home, Building2, Globe, Hash } from "lucide-react";

interface ShippingAddressProps {
    address: Address;
    title?: string;
}

export default function ShippingAddress({
    address,
    title = "Shipping Address",
}: ShippingAddressProps) {
    if (!address) {
        return (
            <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <MapPin className="size-4 text-primary" />
                    </div>
                    <h2 className="text-base font-semibold text-text dark:text-dark-text">
                        {title}
                    </h2>
                </div>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    No shipping address provided for this order.
                </p>
            </div>
        );
    }

    const fields = [
        {
            icon: Home,
            label: "Street",
            value: address.street,
            span: true,
        },
        {
            icon: Building2,
            label: "City",
            value: address.city,
        },
        {
            icon: Hash,
            label: "Zip code",
            value: address.zipCode,
        },
        {
            icon: MapPin,
            label: "State",
            value: address.state,
        },
        {
            icon: Globe,
            label: "Country",
            value: address.country,
        },
    ];

    return (
        <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5">
            <div className="flex items-center gap-3 mb-5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                    <MapPin className="size-4 text-primary" />
                </div>
                <h2 className="text-base font-semibold text-text dark:text-dark-text">
                    {title}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => (
                    <div
                        key={field.label}
                        className={field.span ? "sm:col-span-2" : ""}
                    >
                        <div className="flex items-center gap-1.5 mb-1">
                            <field.icon className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                {field.label}
                            </p>
                        </div>
                        <p className="text-sm font-medium text-text dark:text-dark-text">
                            {field.value || "_"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}