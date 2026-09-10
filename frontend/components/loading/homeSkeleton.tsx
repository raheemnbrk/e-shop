"use client";

export default function HomeSkeleton() {
    return (
        <div className="flex flex-col space-y-6">
            <div className="h-80 md:h-105 lg:h-125 w-full rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />

            <section className="py-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>
                    <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-card dark:bg-dark-card rounded-xl border border-border dark:border-dark-border overflow-hidden"
                        >
                            <div className="aspect-square w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                            <div className="p-3 md:p-4 space-y-2">
                                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                                <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {Array.from({ length: 3 }).map((_, sectionIndex) => (
                <section key={sectionIndex} className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div className="space-y-2">
                            <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                            <div className="h-4 w-56 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        </div>
                        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden"
                            >
                                <div className="h-44 w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                                <div className="p-3 space-y-2">
                                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                                    <div className="h-9 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            <section className="py-16">
                <div className="text-center mb-10 space-y-3">
                    <div className="h-6 w-28 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto animate-pulse" />
                    <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded mx-auto animate-pulse" />
                    <div className="h-4 w-80 bg-gray-200 dark:bg-gray-800 rounded mx-auto animate-pulse" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 space-y-3"
                        >
                            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                            <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}