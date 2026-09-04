export default function OrderDetailsSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-5 w-32 rounded bg-border dark:bg-dark-border" />

            <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                        <div className="h-6 w-56 rounded bg-border dark:bg-dark-border" />
                        <div className="h-4 w-40 rounded bg-border dark:bg-dark-border" />
                    </div>

                    <div className="flex gap-3">
                        <div className="h-10 w-36 rounded-lg bg-border dark:bg-dark-border" />
                        <div className="h-10 w-32 rounded-lg bg-border dark:bg-dark-border" />
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
                <div className="mb-6 h-5 w-32 rounded bg-border dark:bg-dark-border" />

                <div className="relative flex justify-between">
                    <div className="absolute left-[10%] right-[10%] top-4 h-0.5 bg-border dark:bg-dark-border" />

                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="relative z-10 flex w-1/5 flex-col items-center"
                        >
                            <div className="h-8 w-8 rounded-full bg-border dark:bg-dark-border" />

                            <div className="mt-3 h-3 w-20 rounded bg-border dark:bg-dark-border" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
                <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
                    <div className="mb-5 h-5 w-32 rounded bg-border dark:bg-dark-border" />

                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex gap-4 border-b border-border pb-4 last:border-0 dark:border-dark-border"
                            >
                                <div className="h-20 w-20 shrink-0 rounded-lg bg-border dark:bg-dark-border" />

                                <div className="flex-1 space-y-3">
                                    <div className="h-4 w-48 rounded bg-border dark:bg-dark-border" />
                                    <div className="h-3 w-24 rounded bg-border dark:bg-dark-border" />
                                    <div className="h-3 w-28 rounded bg-border dark:bg-dark-border" />
                                </div>

                                <div className="h-4 w-20 rounded bg-border dark:bg-dark-border" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
                    <div className="mb-5 h-5 w-32 rounded bg-border dark:bg-dark-border" />

                    <div className="space-y-5">
                        <div className="flex justify-between">
                            <div className="h-4 w-20 rounded bg-border dark:bg-dark-border" />
                            <div className="h-4 w-20 rounded bg-border dark:bg-dark-border" />
                        </div>

                        <div className="flex justify-between">
                            <div className="h-4 w-20 rounded bg-border dark:bg-dark-border" />
                            <div className="h-4 w-20 rounded bg-border dark:bg-dark-border" />
                        </div>

                        <div className="flex justify-between">
                            <div className="h-4 w-20 rounded bg-border dark:bg-dark-border" />
                            <div className="h-4 w-20 rounded bg-border dark:bg-dark-border" />
                        </div>

                        <div className="border-t border-border pt-4 dark:border-dark-border">
                            <div className="flex justify-between">
                                <div className="h-5 w-16 rounded bg-border dark:bg-dark-border" />
                                <div className="h-6 w-24 rounded bg-border dark:bg-dark-border" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card"
                    >
                        <div className="mb-5 h-5 w-40 rounded bg-border dark:bg-dark-border" />

                        <div className="space-y-3">
                            <div className="h-4 w-40 rounded bg-border dark:bg-dark-border" />
                            <div className="h-4 w-32 rounded bg-border dark:bg-dark-border" />
                            <div className="h-4 w-28 rounded bg-border dark:bg-dark-border" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
                <div className="mb-4 h-5 w-28 rounded bg-border dark:bg-dark-border" />

                <div className="h-4 w-3/4 rounded bg-border dark:bg-dark-border" />
            </div>

            <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
                <div className="mb-5 h-5 w-32 rounded bg-border dark:bg-dark-border" />

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-10 rounded-lg bg-border dark:bg-dark-border"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}