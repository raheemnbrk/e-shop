import { LowStockProductsSkeleton } from "@/components/loading/dashboard/lowStockProductsSkeleton";
import { Product } from "@/types/productTypes";
import { AlertTriangle } from "lucide-react";

interface LowStockProductsProps {
    products: Product[];
    isLoading: boolean;
}

export function LowStockProducts({
    products = [],
    isLoading,
}: LowStockProductsProps) {
    if (isLoading) return <LowStockProductsSkeleton />;

    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-text dark:text-dark-text">
                        Low Stock Products
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                        Products that need restocking
                    </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                </div>
            </div>

            {products.length === 0 ? (
                <div className="flex min-h-32 items-center justify-center">
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        No low stock products
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between gap-4"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                {product.images[0] ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="h-11 w-11 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-xs text-text-secondary dark:bg-dark-muted dark:text-dark-text-secondary">
                                        N/A
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-text dark:text-dark-text">
                                        {product.name}
                                    </p>

                                    <p className="truncate text-xs text-text-secondary dark:text-dark-text-secondary">
                                        Product ID: {product.id}
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0 text-right">
                                <p
                                    className={`text - sm font - semibold ${product.stock <= 2
                                            ? "text-red-600 dark:text-red-400"
                                            : "text-orange-600 dark:text-orange-400"
                                        } `}
                                >
                                    {product.stock} left
                                </p>

                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                    Stock
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

