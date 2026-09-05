import { Skeleton } from "@/components/ui/skeleton";

export default function TopCustomersSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card w-full md:w-[50%]">
            <div className="mb-5 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />

                <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>

            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg p-3"
                    >
                        <Skeleton className="h-8 w-8 rounded-full" />

                        <Skeleton className="h-10 w-10 rounded-full" />

                        <div className="min-w-0 flex-1 space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-20" />
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="ml-auto h-4 w-20" />
                            <Skeleton className="ml-auto h-3 w-10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}