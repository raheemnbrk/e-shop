"use client";

import Link from "next/link";
import { Category } from "@/types/categoryTypes";
import { ArrowRight } from "lucide-react";

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

                <div className="flex flex-wrap overflow-x-scroll gap-4 md:gap-6">
                    {displayCategories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="group block w-40 md:w-48"
                        >
                            <div className="bg-card dark:bg-dark-card rounded-xl border border-border dark:border-dark-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                <div className="h-35 md:h-40 w-full overflow-hidden bg-gray-100 dark:bg-dark-background">
                                    {category.image ? (
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-text-secondary dark:text-dark-text-secondary">
                                            <span className="text-sm">No image</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-3 md:p-4">
                                    <h3 className="text-sm md:text-base font-semibold text-text dark:text-dark-text group-hover:text-primary transition-colors line-clamp-1">
                                        {category.name}
                                    </h3>

                                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">
                                        {category.productCount || 0} products
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}