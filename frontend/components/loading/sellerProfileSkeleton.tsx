export default function SellerProfileSkeleton() {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            <div className="h-4 w-32 bg-border dark:bg-dark-border rounded" />

            <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="size-20 shrink-0 rounded-2xl bg-border dark:bg-dark-border" />

                    <div className="flex-1 min-w-0 space-y-2.5 w-full">
                        <div className="h-6 w-48 bg-border dark:bg-dark-border rounded" />
                        <div className="h-4 w-32 bg-border dark:bg-dark-border rounded" />

                        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                            <div className="h-4 w-44 bg-border dark:bg-dark-border rounded" />
                            <div className="h-4 w-32 bg-border dark:bg-dark-border rounded" />
                            <div className="h-4 w-36 bg-border dark:bg-dark-border rounded" />
                        </div>

                        <div className="h-4 w-40 bg-border dark:bg-dark-border rounded" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="h-3 w-24 bg-border dark:bg-dark-border rounded" />
                            <div className="size-9 rounded-lg bg-border dark:bg-dark-border" />
                        </div>
                        <div className="h-7 w-20 bg-border dark:bg-dark-border rounded" />
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-dark-border">
                    <div className="space-y-2">
                        <div className="h-5 w-24 bg-border dark:bg-dark-border rounded" />
                        <div className="h-3 w-32 bg-border dark:bg-dark-border rounded" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border dark:border-dark-border bg-background dark:bg-dark-background">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <th key={i} className="px-4 py-3 text-left">
                                        <div className="h-3 w-20 bg-border dark:bg-dark-border rounded" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-border dark:border-dark-border last:border-none"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-border dark:bg-dark-border shrink-0" />
                                            <div className="h-4 w-32 bg-border dark:bg-dark-border rounded" />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-4 w-20 bg-border dark:bg-dark-border rounded" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-4 w-16 bg-border dark:bg-dark-border rounded" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-4 w-10 bg-border dark:bg-dark-border rounded" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-6 w-20 bg-border dark:bg-dark-border rounded-full" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}