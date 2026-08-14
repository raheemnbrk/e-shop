import { Store } from "lucide-react";
import Link from "next/link";

export function BecomeSeller() {
    return (
        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary mb-4 pb-3 border-b border-border dark:border-dark-border">
                Become a seller
            </p>

            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4 leading-6">
                Start selling your products on eShop. Reach thousands of customers
                and grow your business.
            </p>

            <Link href="/apply-seller">
                <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition cursor-pointer">
                    <Store className="h-4 w-4" />
                    Apply to become a seller
                </button>
            </Link>
        </div>
    );
}