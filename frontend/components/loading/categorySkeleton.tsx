"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface CategorySkeletonProps {
    count?: number;
}

export function CategorySkeleton({ count = 6 }: CategorySkeletonProps) {
    return (
        <div className="rounded-xl border border-border bg-card dark:border-dark-border dark:bg-dark-card">
            {Array.from({ length: count }).map((_, index) => {
                const isChild = index === 1 || index === 2 || index === 4;
                const isLast = index === count - 1;

                return (
                    <div
                        key={index}
                        className={`flex min-h-16 items-center gap-3 px-4 py-3 sm:px-5 ${!isLast
                                ? "border-b border-border dark:border-dark-border"
                                : ""
                            }`}
                    >
                        <div
                            className={`flex min-w-0 flex-1 items-center gap-3 ${isChild ? "pl-8 sm:pl-12" : ""
                                }`}
                        >
                            <Skeleton className="h-4 w-4 shrink-0 rounded" />

                            <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />

                            <div className="min-w-0 space-y-1.5">
                                <Skeleton
                                    className={`h-4 ${isChild ? "w-28" : "w-36"
                                        }`}
                                />

                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>

                        <Skeleton className="hidden h-6 w-24 rounded-full sm:block" />

                        <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
                    </div>
                );
            })}
        </div>
    );
}