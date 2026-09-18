export function OrdersSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <div
                        key={item}
                        className="h-10 w-24 shrink-0 animate-pulse rounded-full bg-border dark:bg-dark-border"
                    />
                ))}
            </div>

            <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="animate-pulse overflow-hidden rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card"
                    >
                        <div className="flex flex-col gap-3 border-b border-border dark:border-dark-border px-5 py-4 bg-background/50 dark:bg-dark-background/30 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="space-y-2">
                                    <div className="h-3 w-12 rounded bg-border dark:bg-dark-border" />
                                    <div className="h-5 w-24 rounded bg-border dark:bg-dark-border" />
                                </div>

                                <div className="hidden h-8 w-px bg-border dark:bg-dark-border sm:block" />

                                <div className="hidden h-4 w-28 rounded bg-border dark:bg-dark-border sm:block" />
                            </div>

                            <div className="h-6 w-24 rounded-full bg-border dark:bg-dark-border" />
                        </div>

                        <div className="divide-y divide-border dark:divide-dark-border">
                            {[1, 2].map((row) => (
                                <div
                                    key={row}
                                    className="flex items-center gap-4 px-5 py-3.5"
                                >
                                    <div className="size-14 shrink-0 rounded-lg bg-border dark:bg-dark-border" />

                                    <div className="min-w-0 flex-1 space-y-2">
                                        <div className="h-4 w-40 max-w-full rounded bg-border dark:bg-dark-border" />
                                        <div className="h-3 w-32 rounded bg-border dark:bg-dark-border" />
                                    </div>

                                    <div className="shrink-0 space-y-1.5">
                                        <div className="h-4 w-14 rounded bg-border dark:bg-dark-border" />
                                        <div className="h-3 w-12 rounded bg-border dark:bg-dark-border" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 border-t border-border dark:border-dark-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-6">
                                <div className="space-y-1.5">
                                    <div className="h-3 w-10 rounded bg-border dark:bg-dark-border" />
                                    <div className="h-4 w-14 rounded bg-border dark:bg-dark-border" />
                                </div>

                                <div className="h-8 w-px bg-border dark:bg-dark-border" />

                                <div className="space-y-1.5">
                                    <div className="h-3 w-10 rounded bg-border dark:bg-dark-border" />
                                    <div className="h-5 w-20 rounded bg-border dark:bg-dark-border" />
                                </div>
                            </div>

                            <div className="h-10 w-full rounded-lg bg-border dark:bg-dark-border sm:w-28" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}