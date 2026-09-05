import { TopSellingProductsSkeleton } from "@/components/loading/dashboard/topSellingProducts";
import { TopSellingProduct } from "@/types/adminTypes";

interface TopSellingProductsProps {
    products: TopSellingProduct[];
    isLoading: boolean;
}

export function TopSellingProducts({
    products,
    isLoading,
}: TopSellingProductsProps) {
    if (isLoading) return <TopSellingProductsSkeleton />;

    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card w-full md:w-[50%]">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-text dark:text-dark-text">
                    Top Selling Products
                </h2>

                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                    Best performing products in your store
                </p>
            </div>

            {products.length === 0 ? (
                <div className="flex min-h-32 items-center justify-center">
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        No top selling products found.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {products.map((product, index) => (
                        <div
                            key={product.productId}
                            className="flex items-center justify-between gap-4"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-text-secondary dark:bg-primary/10 dark:text-dark-text-secondary">
                                    {index + 1}
                                </span>

                                {product.productImage ? (
                                    <img
                                        src={product.productImage}
                                        alt={product.productName}
                                        className="h-11 w-11 shrink-0 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-xs text-text-secondary dark:bg-dark-muted dark:text-dark-text-secondary">
                                        N/A
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-text dark:text-dark-text">
                                        {product.productName}
                                    </p>

                                    <p className="truncate text-xs text-text-secondary dark:text-dark-text-secondary">
                                        {product.productSlug}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 text-right">
                                <p className="text-sm font-semibold text-text dark:text-dark-text">
                                    {product.sold}
                                </p>

                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                    sold
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}