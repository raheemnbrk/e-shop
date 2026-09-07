"use client";

import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Shield,
    CheckCircle,
    Star,
    Users
} from "lucide-react";

export default function ContactPage() {
    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            details: ["support@shop.com", "info@shop.com"],
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            icon: Phone,
            title: "Phone",
            details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
            color: "bg-green-500/10 text-green-500",
        },
        {
            icon: MapPin,
            title: "Address",
            details: ["123 Commerce Street", "New York, NY 10001"],
            color: "bg-purple-500/10 text-purple-500",
        },
        {
            icon: Clock,
            title: "Working Hours",
            details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: Closed"],
            color: "bg-orange-500/10 text-orange-500",
        },
    ];

    const quickLinks = [
        {
            icon: Shield,
            title: "Secure Shopping",
            description: "100% secure payment processing",
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            icon: CheckCircle,
            title: "Quality Guarantee",
            description: "30-day money-back guarantee",
            color: "bg-green-500/10 text-green-500",
        },
        {
            icon: Star,
            title: "Trusted Service",
            description: "4.8/5 average customer rating",
            color: "bg-amber-500/10 text-amber-500",
        },
        {
            icon: Users,
            title: "Community",
            description: "Join 50,000+ happy customers",
            color: "bg-purple-500/10 text-purple-500",
        },
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-dark-background py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-text dark:text-dark-text mb-2">
                        Get in Touch
                    </h1>
                    <p className="text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                        Have questions about our products or services? We'd love to hear from you.
                        Our team is here to help you 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {contactInfo.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="rounded-xl border border-border bg-card p-4 shadow-sm dark:border-dark-border dark:bg-dark-card transition-all hover:shadow-md"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`rounded-lg p-2 ${item.color}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-text dark:text-dark-text">
                                                {item.title}
                                            </h3>
                                            {item.details.map((detail, i) => (
                                                <p
                                                    key={i}
                                                    className="text-sm text-text-secondary dark:text-dark-text-secondary"
                                                >
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-border bg-card p-4 shadow-sm dark:border-dark-border dark:bg-dark-card">
                            <h3 className="text-sm font-semibold text-text dark:text-dark-text mb-3">
                                Why Choose Us
                            </h3>
                            <div className="space-y-3">
                                {quickLinks.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className={`rounded-lg p-1.5 ${item.color}`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-text dark:text-dark-text">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}