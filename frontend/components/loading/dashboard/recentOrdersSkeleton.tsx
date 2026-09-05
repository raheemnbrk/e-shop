export default function RecentOrdersSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card shadow-sm dark:border-dark-border dark:bg-dark-card">
            <div className="flex items-center justify-between border-b border-border p-5 dark:border-dark-border">
                <div>
                    <div className="h-5 w-32 animate-pulse rounded bg-muted dark:bg-dark-muted" />

                    <div className="mt-2 h-4 w-52 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                </div>

                <div className="h-4 w-16 animate-pulse rounded bg-muted dark:bg-dark-muted" />
            </div>
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border dark:border-dark-border">
                                {[
                                    "Order",
                                    "Customer",
                                    "Items",
                                    "Total",
                                    "Status",
                                    "Date",
                                    "Action",
                                ].map((item) => (
                                    <th
                                        key={item}
                                        className="px-5 py-3 text-left"
                                    >
                                        <div className="h-4 w-16 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-border last:border-0 dark:border-dark-border"
                                >
                                    <td className="px-5 py-4">
                                        <div className="h-4 w-20 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="h-4 w-28 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="h-4 w-8 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="h-4 w-16 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="h-6 w-20 animate-pulse rounded-full bg-muted dark:bg-dark-muted" />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="h-4 w-20 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="h-8 w-8 animate-pulse rounded-md bg-muted dark:bg-dark-muted" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="divide-y divide-border md:hidden dark:divide-dark-border">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="h-4 w-20 animate-pulse rounded bg-muted dark:bg-dark-muted" />

                                <div className="mt-2 h-4 w-28 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                            </div>

                            <div className="h-6 w-20 animate-pulse rounded-full bg-muted dark:bg-dark-muted" />
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <div className="h-4 w-16 animate-pulse rounded bg-muted dark:bg-dark-muted" />

                                <div className="mt-2 h-5 w-20 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                            </div>

                            <div className="text-right">
                                <div className="h-4 w-20 animate-pulse rounded bg-muted dark:bg-dark-muted" />

                                <div className="mt-2 h-4 w-20 animate-pulse rounded bg-muted dark:bg-dark-muted" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}