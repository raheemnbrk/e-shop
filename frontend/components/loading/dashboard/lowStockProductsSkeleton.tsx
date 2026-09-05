import { Skeleton } from "@/components/ui/skeleton";

export function LowStockProductsSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card">
            <div className="mb-5 flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-52" />
                </div>

                <Skeleton className="h-9 w-9 rounded-lg" />
            </div>

            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-11 w-11 rounded-lg" />

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>

                        <div className="space-y-2 text-right">
                            <Skeleton className="ml-auto h-4 w-12" />
                            <Skeleton className="ml-auto h-3 w-8" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
