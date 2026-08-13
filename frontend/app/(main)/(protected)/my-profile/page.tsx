"use client"

import { useChangePassword } from "@/lib/hooks/auth/useChangePassword";
import { useAuthStore } from "@/lib/store/authStore"
import { changePasswordSchema } from "@/lib/validators/auth.schema";
import { Camera, ExternalLink, Eye, EyeOff, Lock, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function MyProfile() {

    const { user } = useAuthStore()

    const stats = [
        { label: "Total orders", value: "24", icon: "🛍️" },
        { label: "Total spent", value: "$1,840", icon: "💳" },
        { label: "Wishlist items", value: "12", icon: "❤️" },
        { label: "Reviews left", value: "8", icon: "⭐" },
    ];


    const [firstName, setFirstName] = useState(user?.firstName ?? "");
    const [lastName, setLastName] = useState(user?.lastName ?? "");
    const [phone, setPhone] = useState(user?.phoneNumber ?? "");

    if (!user) return null;

    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
    });

    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmedNewPassword: "",
    });

    const { changePassword, isPending } = useChangePassword()

    const toggle = (field: keyof typeof show) =>
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = () => {
        const result = changePasswordSchema.safeParse(form);

        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }

        changePassword({
            currentPassword: result.data.currentPassword,
            newPassword: result.data.newPassword,
        });
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-text dark:text-dark-text">My profile</h1>
                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                    Manage your personal information and account settings
                </p>
            </div>

            <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <div className="flex items-start gap-5">
                    <div className="relative shrink-0">
                        {user.image ? (
                            <img src={user.image} alt={user.firstName} className="h-20 w-20 rounded-full object-cover border-2 border-border dark:border-dark-border" />
                        ) : (
                            <div className="h-20 w-20 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-2xl font-bold text-primary">
                                {initials}
                            </div>
                        )}
                        <button className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary border-2 border-card dark:border-dark-card flex items-center justify-center cursor-pointer">
                            <Camera className="h-3 w-3 text-white" />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-text dark:text-dark-text">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-0.5">
                            {user.email} · Member since {memberSince}
                        </p>
                        <div className="flex gap-2 mt-2.5">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-primary">
                                {user.role}
                            </span>
                            {user.isVerified ? (
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 dark:bg-green-950 text-green-600">
                                    ✓ Verified
                                </span>
                            ) : (
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 dark:bg-red-950 text-red-500">
                                    Unverified
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4 text-center">
                        <p className="text-2xl mb-1">{stat.icon}</p>
                        <p className="text-lg font-bold text-text dark:text-dark-text">{stat.value}</p>
                        <p className="text-[11px] uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary mt-0.5">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary mb-4 pb-3 border-b border-border dark:border-dark-border">
                    Personal information
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">First name</label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">Last name</label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">Email address</label>
                        <div className="relative flex items-center">
                            <input disabled value={user.email} className="w-full px-3 py-2.5 pr-9 rounded-lg border border-border dark:border-dark-border bg-border/30 dark:bg-dark-border/30 text-sm text-text-secondary dark:text-dark-text-secondary outline-none cursor-not-allowed" />
                            <Lock className="absolute right-3 h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">Phone number</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary" />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-5 py-2 rounded-lg border border-border dark:border-dark-border text-sm text-text-secondary dark:text-dark-text-secondary hover:border-primary hover:text-primary transition cursor-pointer">Cancel</button>
                    <button className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition cursor-pointer">Save changes</button>
                </div>
            </div>

            <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary mb-4 pb-3 border-b border-border dark:border-dark-border">
                    Change password
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                            Current password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={show.current ? "text" : "password"}
                                name="currentPassword"
                                value={form.currentPassword}
                                onChange={handleChange}
                                placeholder="Enter current password"
                                className="w-full px-3 py-2.5 pr-10 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary"
                            />
                            <button
                                type="button"
                                onClick={() => toggle("current")}
                                className="absolute right-3 text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text cursor-pointer"
                            >
                                {show.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                            New password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={show.new ? "text" : "password"}
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full px-3 py-2.5 pr-10 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary"
                            />
                            <button
                                type="button"
                                onClick={() => toggle("new")}
                                className="absolute right-3 text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text cursor-pointer"
                            >
                                {show.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                            Confirm new password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={show.confirm ? "text" : "password"}
                                name="confirmedNewPassword"
                                value={form.confirmedNewPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="w-full px-3 py-2.5 pr-10 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary"
                            />
                            <button
                                type="button"
                                onClick={() => toggle("confirm")}
                                className="absolute right-3 text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text cursor-pointer"
                            >
                                {show.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isPending || !form.currentPassword || !form.newPassword || !form.confirmedNewPassword}
                        className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Updating..." : "Update password"}
                    </button>
                </div>
            </div>

            {user.seller ? (
                <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary mb-4 pb-3 border-b border-border dark:border-dark-border">
                        Seller information
                    </p>

                    <div className="flex items-start gap-4 mb-5">
                        <img
                            src={user.seller.logo}
                            alt={user.seller.storeName}
                            className="h-16 w-16 rounded-xl object-cover border border-border dark:border-dark-border"
                        />
                        <div>
                            <h3 className="text-base font-semibold text-text dark:text-dark-text">
                                {user.seller.storeName}
                            </h3>
                            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-0.5">
                                /{user.seller.storeSlug}
                            </p>
                            <div className="mt-2">
                                {user.seller.status === "Approved" && (
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 dark:bg-green-950 text-green-600">
                                        ✓ Approved
                                    </span>
                                )}
                                {user.seller.status === "Pending" && (
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600">
                                        ⏳ Pending approval
                                    </span>
                                )}
                                {user.seller.status === "Rejected" && (
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 dark:bg-red-950 text-red-500">
                                        ✕ Rejected
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                                Store description
                            </label>
                            <p className="text-sm text-text dark:text-dark-text leading-6 p-3 rounded-lg bg-background dark:bg-dark-background border border-border dark:border-dark-border">
                                {user.seller.description}
                            </p>
                        </div>
                    </div>

                    {user.seller.status === "Approved" && (
                        <div className="flex gap-2 mt-4">
                            <Link href="/seller/dashboard">
                                <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition cursor-pointer">
                                    <Store className="h-4 w-4" />
                                    Seller dashboard
                                </button>
                            </Link>
                            <Link href={`/sellers/${user.seller.storeSlug}`} target="_blank">
                                <button className="flex items-center gap-2 px-5 py-2 rounded-lg border border-border dark:border-dark-border text-sm text-text-secondary dark:text-dark-text-secondary hover:border-primary hover:text-primary transition cursor-pointer">
                                    <ExternalLink className="h-4 w-4" />
                                    View store
                                </button>
                            </Link>
                        </div>
                    )}

                    {user.seller.status === "Rejected" && (
                        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900">
                            <p className="text-sm text-red-600 dark:text-red-400">
                                Your seller application was rejected. You can reapply with updated information.
                            </p>
                            <Link href="/apply-seller">
                                <button className="mt-2 text-sm font-medium text-red-600 hover:underline cursor-pointer">
                                    Reapply →
                                </button>
                            </Link>
                        </div>
                    )}

                    {user.seller.status === "Pending" && (
                        <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900">
                            <p className="text-sm text-amber-600 dark:text-amber-400">
                                Your application is under review. We'll notify you once it's approved.
                            </p>
                        </div>
                    )}
                </div>
            ) : user.role !== "ADMIN" && (
                <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary mb-4 pb-3 border-b border-border dark:border-dark-border">
                        Become a seller
                    </p>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4 leading-6">
                        Start selling your products on eShop. Reach thousands of customers and grow your business.
                    </p>
                    <Link href="/apply-seller">
                        <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition cursor-pointer">
                            <Store className="h-4 w-4" />
                            Apply to become a seller
                        </button>
                    </Link>
                </div>
            )}

            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-card dark:bg-dark-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 pb-3 border-b border-red-200 dark:border-red-900">
                    Danger zone
                </p>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4 leading-6">
                    Once you delete your account, all your data including orders, reviews, and personal information will be permanently removed. This action cannot be undone.
                </p>
                <button className="px-5 py-2 rounded-lg border border-red-200 dark:border-red-900 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition cursor-pointer">
                    Delete account
                </button>
            </div>
        </div>
    )

}