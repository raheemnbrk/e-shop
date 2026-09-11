"use client";

import SellerProfileSkeleton from "@/components/loading/sellerProfileSkeleton";
import { useGetSellerProfile } from "@/lib/hooks/admin/sellers/useGetSellerProfile";
import { Product } from "@/types/productTypes";
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    Package,
    ShoppingBag,
    DollarSign,
    Store,
    PackageSearch,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SellerProfilePage() {
    const params = useParams();
    const slug = params.slug as string;
    const { data, isLoading, isError } = useGetSellerProfile(slug);

    if (isLoading) return <SellerProfileSkeleton />;

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-border dark:bg-dark-border mb-5">
                    <PackageSearch className="size-10 text-text-secondary dark:text-dark-text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2">
                    Seller not found
                </h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-6">
                    We couldn't find this seller.
                </p>
                <Link
                    href="/admin/sellers"
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primaryHover transition-colors"
                >
                    Back to sellers
                </Link>
            </div>
        );
    }

    const { seller, stats } = data;
    const joinedDate = new Date(seller.user.createdAt).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" },
    );

    const initials = `${seller.user.firstName?.[0] ?? ""}${seller.user.lastName?.[0] ?? ""}`.toUpperCase();

    const statCards = [
        {
            label: "Total Products",
            value: stats.totalProducts,
            icon: Package,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-950/40",
        },
        {
            label: "Total Orders",
            value: stats.totalOrders,
            icon: ShoppingBag,
            color: "text-emerald-500",
            bg: "bg-emerald-50 dark:bg-emerald-950/40",
        },
        {
            label: "Total Revenue",
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-amber-500",
            bg: "bg-amber-50 dark:bg-amber-950/40",
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <Link
                href="/admin/sellers"
                className="inline-flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors w-fit"
            >
                <ArrowLeft className="size-4" />
                Back to sellers
            </Link>

            <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20 overflow-hidden">
                        {seller.logo ? (
                            <img
                                src={seller.logo}
                                alt={seller.storeName}
                                className="size-full object-cover"
                            />
                        ) : (
                            <Store className="size-9 text-primary" />
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-bold text-text dark:text-dark-text mb-1">
                            {seller.storeName}
                        </h1>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-3">
                            {seller.storeSlug}
                        </p>

                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                            <span className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                                <Mail className="size-4 text-primary shrink-0" />
                                {seller.user.email}
                            </span>
                            <span className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                                <Phone className="size-4 text-primary shrink-0" />
                                {seller.user.phoneNumber || "_"}
                            </span>
                            <span className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                                <Calendar className="size-4 text-primary shrink-0" />
                                Joined {joinedDate}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                            {seller.user.image ? (
                                <img
                                    src={seller.user.image}
                                    alt={`${seller.user.firstName} ${seller.user.lastName}`}
                                    className="size-7 rounded-full object-cover border border-border dark:border-dark-border"
                                />
                            ) : (
                                <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-semibold">
                                    {initials || "_"}
                                </div>
                            )}
                            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                Owner:{" "}
                                <span className="font-medium text-text dark:text-dark-text">
                                    {seller.user.firstName} {seller.user.lastName}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statCards.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary">
                                {stat.label}
                            </p>
                            <div
                                className={`flex size-9 items-center justify-center rounded-lg ${stat.bg}`}
                            >
                                <stat.icon className={`size-4 ${stat.color}`} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-text dark:text-dark-text">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-dark-border">
                    <div>
                        <h2 className="text-base font-semibold text-text dark:text-dark-text">
                            Products
                        </h2>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">
                            {seller.products.length}{" "}
                            {seller.products.length === 1 ? "product" : "products"} listed
                        </p>
                    </div>
                </div>

                {seller.products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="flex size-14 items-center justify-center rounded-full bg-border dark:bg-dark-border mb-3">
                            <Package className="size-6 text-text-secondary dark:text-dark-text-secondary" />
                        </div>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                            This seller has no products yet.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border dark:border-dark-border bg-background dark:bg-dark-background">
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                        Product
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                        Stock
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {seller.products.map((product: Product) => {
                                    const finalPrice =
                                        product.discount > 0
                                            ? product.price * (1 - product.discount / 100)
                                            : product.price;

                                    return (
                                        <tr
                                            key={product.id}
                                            className="border-b border-border dark:border-dark-border last:border-none hover:bg-background dark:hover:bg-dark-background/50 transition-colors"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="size-10 rounded-lg object-cover border border-border dark:border-dark-border shrink-0"
                                                    />
                                                    <div className="min-w-0">
                                                        <Link
                                                            href={`/products/${product.slug}`}
                                                            className="font-medium text-text dark:text-dark-text hover:text-primary transition-colors line-clamp-1"
                                                        >
                                                            {product.name}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-text-secondary dark:text-dark-text-secondary">
                                                {product.category.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-semibold text-text dark:text-dark-text">
                                                        ${finalPrice.toFixed(2)}
                                                    </span>
                                                    {product.discount > 0 && (
                                                        <span className="text-xs text-text-secondary dark:text-dark-text-secondary line-through">
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-text-secondary dark:text-dark-text-secondary">
                                                {product.stock}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${product.available
                                                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                                                            : "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                                                        }`}
                                                >
                                                    {product.available ? "Available" : "Unavailable"}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}