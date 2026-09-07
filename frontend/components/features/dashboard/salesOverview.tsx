"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { DashboardPeriod } from "@/types/adminTypes";
import SalesOverviewSkeleton from "@/components/loading/dashboard/salesOverviewSkeleton";
import { SelectDemo } from "../layout/select";
import { useState } from "react";
import { useGetDashBoardStats } from "@/lib/hooks/admin/stats/useGetSalesStats";
import { useAuthStore } from "@/lib/store/authStore";
import { useGetSellerSalesStats } from "@/lib/hooks/seller/useGetSellerSalesChart";

const periodItems = [
    {
        label: "Last 7 days",
        value: "7d",
    },
    {
        label: "Last 30 days",
        value: "30d",
    },
    {
        label: "Last 12 months",
        value: "12m",
    },
];

const formatYAxis = (value: number) => {
    if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value}`;
};

export default function SalesOverview() {
    const { user } = useAuthStore()
    const [period, setPeriod] = useState<DashboardPeriod>("30d")
    const { data, isLoading } = user?.role === "ADMIN" ? useGetDashBoardStats(period) : useGetSellerSalesStats(period)

    if (isLoading) {
        return <SalesOverviewSkeleton />;
    }

    return (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm dark:border-dark-border dark:bg-dark-card w-full md:w-[50%]">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-base font-semibold text-text dark:text-dark-text">
                        Sales Overview
                    </h2>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        Track your sales and orders over time
                    </p>
                </div>
                <SelectDemo
                    items={periodItems}
                    value={period}
                    onchange={(value) => setPeriod(value as DashboardPeriod)}
                />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-3">
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        Total Sales
                    </p>
                    <p className="mt-1 text-xl font-bold text-text dark:text-dark-text">
                        ${data?.salesChart?.totalSales.toFixed(2) ?? "0.00"}
                    </p>
                </div>
                <div className="bg-blue-500/5 dark:bg-blue-500/10 rounded-lg p-3">
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        Total Orders
                    </p>
                    <p className="mt-1 text-xl font-bold text-text dark:text-dark-text">
                        {data?.salesChart?.totalOrders ?? 0}
                    </p>
                </div>
            </div>

            <div className="mb-3 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        Sales
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        Orders
                    </span>
                </div>
            </div>

            <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data?.salesChart?.data ?? []}
                        margin={{
                            top: 5,
                            right: 5,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="hsl(var(--primary))"
                                    stopOpacity={0.25}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="hsl(var(--primary))"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="#60a5fa"
                                    stopOpacity={0.15}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#60a5fa"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            className="stroke-border/60 dark:stroke-dark-border/60"
                            strokeWidth={0.5}
                        />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fontSize: 10,
                            }}
                            tickMargin={6}
                            className="fill-text-secondary dark:fill-dark-text-secondary"
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fontSize: 10,
                            }}
                            tickFormatter={formatYAxis}
                            width={45}
                            className="fill-text-secondary dark:fill-dark-text-secondary"
                        />

                        <Tooltip
                            cursor={{
                                stroke: "hsl(var(--border))",
                                strokeDasharray: "3 3",
                                strokeWidth: 1,
                            }}
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid hsl(var(--border))",
                                backgroundColor: "hsl(var(--card))",
                                padding: "8px 10px",
                                fontSize: "12px",
                            }}
                            labelStyle={{
                                color: "hsl(var(--foreground))",
                                fontWeight: 600,
                                marginBottom: "4px",
                                fontSize: "11px",
                            }}
                            formatter={(value, name) => [
                                name === "sales"
                                    ? `$${Number(value).toFixed(2)}`
                                    : Number(value),
                                name === "sales" ? "Sales" : "Orders",
                            ]}
                        />

                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="hsl(var(--primary))"
                            fill="url(#salesGradient)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 4,
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="orders"
                            stroke="#60a5fa"
                            fill="url(#ordersGradient)"
                            strokeWidth={1.5}
                            dot={false}
                            activeDot={{
                                r: 3,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}