import { Skeleton } from "@/components/ui/skeleton";

export function TopSellingProductsSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card w-full md:w-[50%]">
            <div className="mb-5 space-y-2">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-4 w-56" />
            </div>

            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-7 w-7 rounded-full" />
                            <Skeleton className="h-11 w-11 rounded-lg" />

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="ml-auto h-4 w-8" />
                            <Skeleton className="ml-auto h-3 w-8" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}