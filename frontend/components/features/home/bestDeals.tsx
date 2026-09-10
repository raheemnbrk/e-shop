"use client";

import { Product } from "@/types/productTypes";
import ProductCard from "../products/productCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BestDealsProps {
    products: Product[];
}

export default function BestDeals({ products }: BestDealsProps) {
    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-dark-text">
                        Best Deals
                    </h2>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                        Get the best discounts on top products
                    </p>
                </div>
                <Link
                    href="/products?sort=discount"
                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                >
                    <span>View all</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                        <Link key={product.id} href={`/products/${product.slug}`}>
                            <ProductCard product={product} />
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary dark:text-dark-text-secondary text-center py-8">
                    No deals available right now
                </p>
            )}
        </section>
    );
}