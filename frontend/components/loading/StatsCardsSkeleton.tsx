interface StatsCardsSkeletonProps {
    count?: number;
}

export default function StatsCardsSkeleton({
    count = 4,
}: StatsCardsSkeletonProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card"
                >
                    <div className="h-4 w-24 animate-pulse rounded bg-muted dark:bg-dark-muted" />

                    <div className="mt-4 h-9 w-28 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                </div>
            ))}
        </div>
    );
}