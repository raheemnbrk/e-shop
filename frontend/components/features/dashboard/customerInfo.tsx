import { User, MapPin } from "lucide-react";
import { Order } from "@/types/orderTypes";

interface CustomerInfoProps {
    order: Order;
    showEmail?: boolean;
}

export default function CustomerInfo({ order, showEmail = false }: CustomerInfoProps) {
    return (
        <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5">
            <div className="flex items-center gap-3 mb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                    <User className="size-4 text-primary" />
                </div>
                <h2 className="text-base font-semibold text-text dark:text-dark-text">
                    Customer
                </h2>
            </div>

            <div className="space-y-3">
                <div>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-0.5">
                        Name
                    </p>
                    <p className="text-sm font-medium text-text dark:text-dark-text">
                        {order.user?.firstName} {order.user?.lastName}
                    </p>
                </div>

                {showEmail && order.user?.email && (
                    <div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-0.5">
                            Email
                        </p>
                        <p className="text-sm font-medium text-text dark:text-dark-text break-all">
                            {order.user.email}
                        </p>
                    </div>
                )}
            </div>

            {order.address && (
                <>
                    <div className="flex items-center gap-3 mt-6 mb-4">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                            <MapPin className="size-4 text-primary" />
                        </div>
                        <h2 className="text-base font-semibold text-text dark:text-dark-text">
                            Shipping
                        </h2>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-0.5">
                                Address
                            </p>
                            <p className="text-sm font-medium text-text dark:text-dark-text">
                                {order.address.street}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-0.5">
                                    City
                                </p>
                                <p className="text-sm font-medium text-text dark:text-dark-text">
                                    {order.address.city}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-0.5">
                                    Zip code
                                </p>
                                <p className="text-sm font-medium text-text dark:text-dark-text">
                                    {order.address.zipCode}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-0.5">
                                Country
                            </p>
                            <p className="text-sm font-medium text-text dark:text-dark-text">
                                {order.address.country}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}