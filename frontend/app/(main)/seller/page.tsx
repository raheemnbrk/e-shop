"use client"

import RecentOrders from "@/components/features/dashboard/recentOrders"
import StatsCards from "@/components/features/dashboard/dashboardCards"
import { LowStockProducts } from "@/components/features/dashboard/lowStockProducts"
import { useGetSellerDashboardStats } from "@/lib/hooks/seller/useGetSellerDashboardStats"
import { TopSellingProducts } from "@/components/features/dashboard/topSellingProducts"
import TopCustomers from "@/components/features/dashboard/topCustomers"
import SalesOverview from "@/components/features/dashboard/salesOverview"
import OrdersStatusChart from "@/components/features/dashboard/orderByStatusCount"

export default function SellerDashboardPage() {
    const { data, isLoading } = useGetSellerDashboardStats()
    const items = [
        { label: "Total Orders", value: data?.stats.totalOrders ?? 0 },
        { label: "Total Products", value: data?.stats.totalProducts ?? 0 },
        { label: "Total Customers", value: data?.stats.totalCustomers ?? 0 },
        { label: "Total Revenues", value: `$${data?.stats.totalRevenue ?? 0}` },
    ]
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-text dark:text-dark-text">Seller Dashboard</h1>
                <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
                    Overview of your store performance and management tools.
                </p>
            </div>

            <StatsCards items={items} isLoading={isLoading} />

            <div className="flex flex-col md:flex-row gap-6" >
                <SalesOverview />
                <OrdersStatusChart ordersByStatus={data?.ordersByStatus ?? []} isLoading={isLoading} />
            </div>

            <div className="flex flex-col md:flex-row gap-6" >
                <TopSellingProducts
                    products={(data?.topSellingProducts ?? []) as unknown as React.ComponentProps<typeof TopSellingProducts>["products"]}
                    isLoading={isLoading}
                />
                <TopCustomers customers={data?.topCustomers ?? []} isLoading={isLoading} />
            </div>
            <RecentOrders orders={data?.recentOrders ?? []} isLoading={isLoading} link={"seller"} />
            <LowStockProducts products={data?.lowStockProducts ?? []} isLoading={isLoading} />
        </div>
    )
}