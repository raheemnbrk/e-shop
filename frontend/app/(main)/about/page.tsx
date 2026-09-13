"use client";

import Link from "next/link";
import {
    Shield,
    Truck,
    Award,
    Headphones,
    ShoppingBag,
    CreditCard,
    ChevronRight
} from "lucide-react";

export default function AboutPage() {
    const features = [
        {
            icon: ShoppingBag,
            title: "Wide Selection",
            description: "Browse thousands of products across multiple categories with competitive prices.",
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            icon: Shield,
            title: "Secure Shopping",
            description: "Your data and transactions are protected with industry-leading security.",
            color: "bg-green-500/10 text-green-500",
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            description: "Enjoy reliable shipping options with real-time tracking on every order.",
            color: "bg-purple-500/10 text-purple-500",
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            description: "Our dedicated support team is always ready to assist you with any issues.",
            color: "bg-orange-500/10 text-orange-500",
        },
        {
            icon: CreditCard,
            title: "Easy Payments",
            description: "Multiple payment options with secure checkout process for your convenience.",
            color: "bg-emerald-500/10 text-emerald-500",
        },
        {
            icon: Award,
            title: "Quality Guarantee",
            description: "We stand behind every product with our satisfaction guarantee policy.",
            color: "bg-amber-500/10 text-amber-500",
        },
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-dark-background py-8 px-4">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-text dark:text-dark-text mb-2">
                        About Our Store
                    </h1>
                    <p className="text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                        We're passionate about providing the best shopping experience with
                        quality products and exceptional customer service.
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-dark-border dark:bg-dark-card mb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold text-text dark:text-dark-text mb-4">
                                Our Story
                            </h2>
                            <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed mb-3">
                                Founded in 2026, our journey began with a simple mission:
                                to revolutionize the online shopping experience. What started
                                as a small team of passionate individuals has grown into a
                                trusted platform serving thousands of customers worldwide.
                            </p>
                            <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                                We believe in quality, transparency, and putting our customers
                                first. Every product in our store is carefully selected to meet
                                our high standards of excellence.
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-6 text-center">
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                    Building the future of online shopping, one customer at a time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-text dark:text-dark-text mb-4">
                    Why Choose Us
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card transition-all hover:shadow-md"
                            >
                                <div className={`rounded-lg w-fit p-2.5 mb-3 ${feature.color}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-semibold text-text dark:text-dark-text mb-1.5">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-6 text-center mt-10">
                    <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2">
                        Ready to Start Shopping?
                    </h3>
                    <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-4">
                        Explore our collection and find the perfect products for you.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primaryHover transition-colors"
                    >
                        Browse Products
                        <ShoppingBag className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}