"use client";

import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { Category } from "@/types/categoryTypes";

interface CategoryCardProps {
    category: Category;
    href?: string;
}

export default function CategoryCard({ category, href }: CategoryCardProps) {
    const linkHref = href ?? `/categories/${category.slug}`;

    return (
        <Link
            href={linkHref}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/40 dark:hover:border-primary/40"
        >
            <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-background dark:bg-dark-background border border-border dark:border-dark-border">
                {category.image ? (
                    <img
                        src={category.image}
                        alt={category.name}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <PackageSearch className="size-7 text-text-secondary dark:text-dark-text-secondary" />
                )}
            </div>

            <div className="text-center min-w-0 w-full">
                <p className="text-sm font-semibold text-text dark:text-dark-text group-hover:text-primary transition-colors line-clamp-1">
                    {category.name}
                </p>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">
                    {category.productCount ?? 0} products
                </p>
            </div>
        </Link>
    );
}