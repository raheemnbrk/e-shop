export function OrdersSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                        key={item}
                        className="h-10 w-24 shrink-0 animate-pulse rounded-lg bg-border dark:bg-dark-border"
                    />
                ))}
            </div>

            <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="animate-pulse rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card"
                    >
                        <div className="flex flex-col gap-3 border-b border-border pb-4 dark:border-dark-border sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-border dark:bg-dark-border" />
                                <div className="h-3 w-24 rounded bg-border dark:bg-dark-border" />
                            </div>

                            <div className="h-7 w-24 rounded-full bg-border dark:bg-dark-border" />
                        </div>

                        <div className="divide-y divide-border dark:divide-dark-border">
                            {[1, 2].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4 py-4"
                                >
                                    <div className="h-16 w-16 shrink-0 rounded-lg bg-border dark:bg-dark-border" />

                                    <div className="min-w-0 flex-1 space-y-2">
                                        <div className="h-4 w-40 rounded bg-border dark:bg-dark-border" />
                                        <div className="h-3 w-20 rounded bg-border dark:bg-dark-border" />
                                    </div>

                                    <div className="h-4 w-16 rounded bg-border dark:bg-dark-border" />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-4 border-t border-border pt-4 dark:border-dark-border sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-2">
                                <div className="h-3 w-12 rounded bg-border dark:bg-dark-border" />
                                <div className="h-5 w-20 rounded bg-border dark:bg-dark-border" />
                            </div>

                            <div className="h-10 w-28 rounded-lg bg-border dark:bg-dark-border" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}