"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const footerLinks = {
    shop: ["All Products", "New Arrivals", "Best Deals", "Top Selling", "Categories"],
    company: ["About Us", "Why Deal With Us", "Contact"],
    support: ["Help Center", "Track Order", "Shipping Info", "Returns & Refunds", "FAQ"],
};

export default function Footer() {
    return (
        <footer className="bg-card dark:bg-dark-card border-t border-border dark:border-dark-border mt-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold text-primary">E-Shop</span>
                        </Link>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-6 max-w-sm">
                            Your one-stop shop for quality products at unbeatable prices.
                            Trusted by thousands of happy customers worldwide.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-text dark:text-dark-text mb-4 uppercase tracking-wider">
                            Shop
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.shop.map((label) => (
                                <li key={label}>
                                    <Link
                                        href="#"
                                        className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-text dark:text-dark-text mb-4 uppercase tracking-wider">
                            Company
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((label) => (
                                <li key={label}>
                                    <Link
                                        href="#"
                                        className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-text dark:text-dark-text mb-4 uppercase tracking-wider">
                            Support
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.support.map((label) => (
                                <li key={label}>
                                    <Link
                                        href="#"
                                        className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        © {new Date().getFullYear()} E-Shop. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-xs text-text-secondary dark:text-dark-text-secondary">
                            <Phone className="h-3.5 w-3.5 text-primary" />
                            +1 (234) 567-890
                        </span>
                        <span className="flex items-center gap-2 text-xs text-text-secondary dark:text-dark-text-secondary">
                            <Mail className="h-3.5 w-3.5 text-primary" />
                            support@eshop.com
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}