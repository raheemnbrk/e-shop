import { Skeleton } from "@/components/ui/skeleton";

export function AddressInformationSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card p-6 dark:border-dark-border dark:bg-dark-card">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4 dark:border-dark-border">
                <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-2 h-3 w-56" />
                </div>

                <Skeleton className="h-9 w-32 rounded-lg" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-border p-4 dark:border-dark-border"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                                <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                    </div>

                                    <div className="mt-3 space-y-2">
                                        <Skeleton className="h-3 w-40" />
                                        <Skeleton className="h-3 w-32" />
                                        <Skeleton className="h-3 w-36" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex shrink-0 gap-1">
                                <Skeleton className="h-8 w-8 rounded-lg" />
                                <Skeleton className="h-8 w-8 rounded-lg" />
                            </div>
                        </div>

                        <Skeleton className="mt-4 h-4 w-28" />
                    </div>
                ))}
            </div>
        </div>
    );
}