export function ProfileSkeleton() {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            <div>
                <div className="h-8 w-40 rounded bg-border dark:bg-dark-border" />
                <div className="h-4 w-80 rounded bg-border dark:bg-dark-border mt-2" />
            </div>

            <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <div className="flex items-start gap-5">
                    <div className="h-20 w-20 shrink-0 rounded-full bg-border dark:bg-dark-border" />

                    <div className="flex-1">
                        <div className="h-5 w-40 rounded bg-border dark:bg-dark-border" />

                        <div className="h-4 w-64 rounded bg-border dark:bg-dark-border mt-2" />

                        <div className="flex gap-2 mt-3">
                            <div className="h-6 w-20 rounded-full bg-border dark:bg-dark-border" />
                            <div className="h-6 w-20 rounded-full bg-border dark:bg-dark-border" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4"
                    >
                        <div className="h-8 w-8 rounded bg-border dark:bg-dark-border mx-auto" />
                        <div className="h-6 w-16 rounded bg-border dark:bg-dark-border mx-auto mt-3" />
                        <div className="h-3 w-24 rounded bg-border dark:bg-dark-border mx-auto mt-2" />
                    </div>
                ))}
            </div>

            <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <div className="h-4 w-40 rounded bg-border dark:bg-dark-border mb-5 pb-3" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex flex-col gap-2">
                            <div className="h-3 w-24 rounded bg-border dark:bg-dark-border" />
                            <div className="h-11 w-full rounded-lg bg-border dark:bg-dark-border" />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <div className="h-10 w-20 rounded-lg bg-border dark:bg-dark-border" />
                    <div className="h-10 w-28 rounded-lg bg-border dark:bg-dark-border" />
                </div>
            </div>

            <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <div className="h-4 w-40 rounded bg-border dark:bg-dark-border mb-5" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <div className="h-3 w-32 rounded bg-border dark:bg-dark-border" />
                        <div className="h-11 w-full rounded-lg bg-border dark:bg-dark-border" />
                    </div>

                    {[1, 2].map((item) => (
                        <div key={item} className="flex flex-col gap-2">
                            <div className="h-3 w-32 rounded bg-border dark:bg-dark-border" />
                            <div className="h-11 w-full rounded-lg bg-border dark:bg-dark-border" />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-4">
                    <div className="h-10 w-36 rounded-lg bg-border dark:bg-dark-border" />
                </div>
            </div>

            <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <div className="h-4 w-40 rounded bg-border dark:bg-dark-border mb-5" />

                <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-xl bg-border dark:bg-dark-border" />

                    <div className="flex-1">
                        <div className="h-5 w-40 rounded bg-border dark:bg-dark-border" />
                        <div className="h-4 w-24 rounded bg-border dark:bg-dark-border mt-2" />
                        <div className="h-6 w-20 rounded-full bg-border dark:bg-dark-border mt-2" />
                    </div>
                </div>

                <div className="mt-5">
                    <div className="h-3 w-32 rounded bg-border dark:bg-dark-border mb-2" />
                    <div className="h-20 w-full rounded-lg bg-border dark:bg-dark-border" />
                </div>
            </div>

            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-card dark:bg-dark-card p-6">
                <div className="h-4 w-28 rounded bg-border dark:bg-dark-border mb-5" />

                <div className="h-4 w-full max-w-2xl rounded bg-border dark:bg-dark-border" />
                <div className="h-4 w-3/4 rounded bg-border dark:bg-dark-border mt-2" />

                <div className="h-10 w-32 rounded-lg bg-border dark:bg-dark-border mt-4" />
            </div>
        </div>
    );
}