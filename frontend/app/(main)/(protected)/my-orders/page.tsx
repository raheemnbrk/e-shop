"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import OrdersList from "@/components/features/orders/ordersList"

export default function Orders() {
    return (
        <main className="min-h-screen bg-background dark:bg-dark-background">
            <div className="mx-auto max-w-7xl space-y-8">
                <nav className="flex items-center gap-1.5 text-sm">
                    <Link
                        href="/"
                        className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                    >
                        Home
                    </Link>
                    <ChevronRight className="size-3.5 text-text-secondary dark:text-dark-text-secondary" />
                    <span className="font-medium text-text dark:text-dark-text">
                        My Orders
                    </span>
                </nav>

                <div>
                    <h1 className="text-2xl font-bold text-text dark:text-dark-text sm:text-3xl">
                        My Orders
                    </h1>
                    <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                        Track and manage your orders
                    </p>
                </div>

                <OrdersList />
            </div>
        </main>
    )
}