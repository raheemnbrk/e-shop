import { Skeleton } from "@/components/ui/skeleton";

export default function SalesOverviewSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-56" />
                </div>

                <Skeleton className="h-10 w-32 rounded-lg" />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-7 w-28" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-7 w-16" />
                </div>
            </div>

            <div className="h-80 w-full">
                <div className="flex h-full items-end gap-3">
                    {Array.from({ length: 30 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="flex-1 rounded-t-md"
                            style={{
                                height: `${30 + ((index * 17) % 60)}%`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}