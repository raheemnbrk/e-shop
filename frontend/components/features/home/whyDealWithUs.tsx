"use client";

import Link from "next/link";
import {
    ShieldCheck,
    Truck,
    Headphones,
    RotateCcw,
    BadgePercent,
    CreditCard,
    ArrowRight,
    CheckCircle2,
    Award,
} from "lucide-react";

const benefits = [
    {
        icon: ShieldCheck,
        title: "Secure Shopping",
        description:
            "Your data is protected with bank-level 256-bit SSL encryption.",
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
        icon: Truck,
        title: "Fast & Free Delivery",
        description:
            "Free shipping on orders over $50. Delivered within 2-4 business days.",
        color: "text-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        description:
            "Return any product within 30 days for a full refund, no questions asked.",
        color: "text-orange-500",
        bg: "bg-orange-50 dark:bg-orange-950/40",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description:
            "Our dedicated support team is available around the clock to help you.",
        color: "text-purple-500",
        bg: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
        icon: BadgePercent,
        title: "Best Prices",
        description:
            "Competitive prices on all products. Find it cheaper? We'll match it.",
        color: "text-pink-500",
        bg: "bg-pink-50 dark:bg-pink-950/40",
    },
    {
        icon: CreditCard,
        title: "Flexible Payments",
        description:
            "Pay your way with cards, PayPal, or cash on delivery.",
        color: "text-cyan-500",
        bg: "bg-cyan-50 dark:bg-cyan-950/40",
    },
];

const guarantees = [
    "100% authentic products from verified sellers",
    "Free returns within 30 days",
    "Price match guarantee on eligible items",
    "Secure payment with fraud protection",
];

export default function WhyDealWithUs() {
    return (
        <section className="py-16">
            <div className="text-center mb-10">
                <span className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    Why Choose Us
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-dark-text mb-2">
                    Why Deal With Us
                </h2>
                <p className="text-sm md:text-base text-text-secondary dark:text-dark-text-secondary max-w-xl mx-auto">
                    We're committed to giving you the best shopping experience
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
                {benefits.map((benefit) => (
                    <div
                        key={benefit.title}
                        className="group bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300"
                    >
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${benefit.bg} mb-4 transition-transform group-hover:scale-110`}
                        >
                            <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                        </div>
                        <h3 className="text-base md:text-lg font-semibold text-text dark:text-dark-text mb-2">
                            {benefit.title}
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-6">
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-gray-50 dark:bg-dark-background/50 rounded-2xl p-8 md:p-12">
                <div>
                    <span className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                        Our Promise
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-text dark:text-dark-text mb-4">
                        Our Commitment to You
                    </h3>
                    <p className="text-sm md:text-base text-text-secondary dark:text-dark-text-secondary mb-6 leading-7">
                        We stand behind every product we sell. If you're not completely
                        satisfied with your purchase, we'll make it right.
                    </p>

                    <ul className="space-y-3 mb-8">
                        {guarantees.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm text-text dark:text-dark-text">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primaryHover hover:shadow-xl hover:scale-105 transition-all duration-200 group"
                    >
                        Start Shopping
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="relative">
                    <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center p-8">
                        <div className="text-center">
                            <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-card dark:bg-dark-card shadow-lg mb-4">
                                <Award className="h-10 w-10 text-primary" />
                            </div>
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                100%
                            </p>
                            <p className="text-sm md:text-base font-semibold text-text dark:text-dark-text">
                                Satisfaction Guarantee
                            </p>
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                                Or your money back
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}