import StatsCardsSkeleton from "@/components/loading/StatsCardsSkeleton";
import { useGetProfileStats } from "@/lib/hooks/auth/useGetProfileStats";

export function ProfileStats() {
    const { data, isLoading } = useGetProfileStats()

    const stats = [
        { label: "Total orders", value: data?.result.ordersCount ?? 0, icon: "🛍️" },
        { label: "Total spent", value: `$${data?.result.totalSpent ?? 0}`, icon: "💳" },
        { label: "Cart items", value: data?.result.cartItemsCount ?? 0, icon: "🛒" },
        { label: "Reviews left", value: data?.result.reviewsCount ?? 0, icon: "⭐" },
    ];

    if (isLoading) return <StatsCardsSkeleton />

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4 text-center"
                >
                    <p className="text-2xl mb-1">{stat.icon}</p>

                    <p className="text-lg font-bold text-text dark:text-dark-text">
                        {stat.value}
                    </p>

                    <p className="text-[11px] uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary mt-0.5">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    );
}