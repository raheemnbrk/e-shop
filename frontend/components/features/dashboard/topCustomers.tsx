"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import { TopCustomer } from "@/types/adminTypes";
import TopCustomersSkeleton from "@/components/loading/dashboard/topCustomersSkeleton";

interface TopCustomersProps {
    customers: TopCustomer[];
    isLoading: boolean;
}

export default function TopCustomers({
    customers,
    isLoading,
}: TopCustomersProps) {
    if (isLoading) {
        return <TopCustomersSkeleton />;
    }

    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card w-full md:w-[50%]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-text dark:text-dark-text">
                        Top Customers
                    </h2>

                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        Customers with the highest spending
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {customers.map((customer, index) => (
                    <div
                        key={customer.userId}
                        className="flex items-center gap-3 rounded-lg p-3"
                    >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-text-secondary dark:bg-primary/10 dark:text-dark-text-secondary">
                            {index + 1}
                        </span>

                        {customer.image ? (
                            <Image
                                src={customer.image}
                                alt={`${customer.firstName} ${customer.lastName}`}
                                width={40}
                                height={40}
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-sm font-semibold text-primary border border-primary/10">
                                {customer.firstName?.[0]}
                                {customer.lastName?.[0]}
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-text dark:text-dark-text">
                                {customer.firstName} {customer.lastName}
                            </p>

                            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                {customer.orders} {customer.orders === 1 ? "order" : "orders"}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold text-text dark:text-dark-text">
                                ${customer.totalSpent.toFixed(2)}
                            </p>

                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                spent
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}