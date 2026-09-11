"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types/categoryTypes";
import CategoryCard from "@/components/features/products/categoryCard";

interface CategorySectionProps {
    categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
    const displayCategories = categories.slice(0, 6);

    return (
        <section>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-dark-text">
                            Shop by Category
                        </h2>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                            Find exactly what you're looking for
                        </p>
                    </div>
                    <Link
                        href="/categories"
                        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                    >
                        <span>View all</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {displayCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}