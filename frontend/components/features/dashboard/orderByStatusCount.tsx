"use client";

import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Cell,
    Legend,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

interface OrdersStatusCount {
    status: string;
    count: number;
}

interface OrdersStatusChartProps {
    ordersByStatus: OrdersStatusCount[];
    isLoading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
    PENDING: "#facc15",
    CONFIRMED: "#3b82f6",
    PROCESSING: "#a855f7",
    SHIPPED: "#6366f1",
    DELIVERED: "#22c55e",
    CANCELLED: "#ef4444",
};

const STATUS_LABELS: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
};

const RADIAN = Math.PI / 180;

const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: PieLabelRenderProps) => {
    const safeCx = cx ?? 0;
    const safeCy = cy ?? 0;
    const safeMidAngle = midAngle ?? 0;
    const safeInnerRadius = innerRadius ?? 0;
    const safeOuterRadius = outerRadius ?? 0;
    const safePercent = percent ?? 0;
    const radius = safeInnerRadius + (safeOuterRadius - safeInnerRadius) * 0.5;
    const x = safeCx + radius * Math.cos(-safeMidAngle * RADIAN);
    const y = safeCy + radius * Math.sin(-safeMidAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-medium"
        >
            {`${(safePercent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomLegendContent = ({ payload }: any) => {
    return (
        <div className="flex flex-wrap gap-3 justify-center mt-3">
            {payload?.map((entry: any, index: number) => (
                <div key={`legend-${index}`} className="flex items-center gap-1.5">
                    <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default function OrdersStatusChart({
    ordersByStatus,
    isLoading = false,
}: OrdersStatusChartProps) {
    const chartData = ordersByStatus?.map((item) => ({
        name: STATUS_LABELS[item.status] || item.status,
        value: item.count,
        status: item.status,
    }));

    const totalOrders = ordersByStatus?.reduce((sum, item) => sum + item.count, 0) || 0;

    if (isLoading) {
        return (
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm dark:border-dark-border dark:bg-dark-card w-full md:w-1/2">
                <div className="animate-pulse">
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-60 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </div>
        );
    }

    if (!ordersByStatus?.length || totalOrders === 0) {
        return (
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm dark:border-dark-border dark:bg-dark-card w-full md:w-1/2">
                <div className="mb-4">
                    <h2 className="text-base font-semibold text-text dark:text-dark-text">
                        Orders by Status
                    </h2>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        Order distribution
                    </p>
                </div>
                <div className="flex h-60 items-center justify-center">
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        No orders data available
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm dark:border-dark-border dark:bg-dark-card w-full md:w-1/2">
            <div className="mb-4 flex flex-col gap-1">
                <h2 className="text-base font-semibold text-text dark:text-dark-text">
                    Orders by Status
                </h2>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    Total: {totalOrders} orders
                </p>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            labelLine={false}
                            label={CustomLabel}
                        >
                            {chartData?.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={STATUS_COLORS[entry.status] || "#94a3b8"}
                                    className="cursor-pointer transition-opacity hover:opacity-80"
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid hsl(var(--border))",
                                backgroundColor: "hsl(var(--card))",
                                padding: "8px 12px",
                                fontSize: "12px",
                            }}
                            labelStyle={{
                                color: "hsl(var(--foreground))",
                                fontWeight: 600,
                                fontSize: "11px",
                            }}
                            formatter={(value, name) => {
                                const numericValue = Number(value ?? 0);

                                return [
                                    `${numericValue} orders (${((numericValue / totalOrders) * 100).toFixed(1)}%)`,
                                    String(name ?? ""),
                                ] as [string, string];
                            }}
                        />
                        <Legend
                            content={CustomLegendContent}
                            verticalAlign="bottom"
                            height={36}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}