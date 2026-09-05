"use client";

import StatsCardsSkeleton from "@/components/loading/StatsCardsSkeleton";
import { useEffect, useState } from "react";

interface StatItem {
    label: string;
    value: string | number;
}

interface StatsCardsProps {
    items: StatItem[];
    isLoading: boolean
}

export default function StatsCards({ items, isLoading }: StatsCardsProps) {
    if (isLoading) return <StatsCardsSkeleton />
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
                <StatCard key={item.label} item={item} />
            ))}
        </div>
    );
}

function StatCard({ item }: { item: StatItem }) {
    const target = Number(item.value);
    const isNumber = !isNaN(target);

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isNumber) return;

        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const currentValue = Math.floor(target * progress);

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [target, isNumber]);

    return (
        <div
            className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card"
        >
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                {item.label}
            </p>

            <p className="mt-3 text-3xl font-bold text-text dark:text-dark-text">
                {isNumber ? count.toLocaleString() : item.value}
            </p>
        </div>
    );
}