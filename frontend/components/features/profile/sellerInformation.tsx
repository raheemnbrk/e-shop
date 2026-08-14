"use client";

import { SellerInfo } from "@/types/authTypes";
import {
    ExternalLink,
    Store,
    Pencil,
    X,
    Camera,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUpdateSeller } from "@/lib/hooks/seller/useUpdateSeller";

export function SellerInformation({
    Seller,
}: {
    Seller: SellerInfo;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [storeName, setStoreName] = useState(Seller.storeName);
    const [description, setDescription] = useState(
        Seller.description ?? "",
    );
    const [logo, setLogo] = useState(Seller.logo);
    const [logoFile, setLogoFile] = useState<File | undefined>();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { updateSeller, isPending } = useUpdateSeller();

    useEffect(() => {
        if (!isEditing) {
            setStoreName(Seller.storeName);
            setDescription(Seller.description ?? "");
            setLogo(Seller.logo);
            setLogoFile(undefined);
        }
    }, [Seller, isEditing]);

    const handleLogoChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setLogoFile(file);

        const previewUrl = URL.createObjectURL(file);
        setLogo(previewUrl);
    };

    const handleCancel = () => {
        if (isPending) return;

        setStoreName(Seller.storeName);
        setDescription(Seller.description ?? "");
        setLogo(Seller.logo);
        setLogoFile(undefined);
        setIsEditing(false);
    };

    const handleSave = async () => {
        const trimmedStoreName = storeName.trim();

        if (!trimmedStoreName || isPending) return;

        try {
            const data = await updateSeller({
                storeName: trimmedStoreName,
                description: description.trim(),
                file: logoFile,
            });

            if (data?.seller) {
                setStoreName(data.seller.storeName);
                setDescription(data.seller.description ?? "");
                setLogo(data.seller.logo);
                setLogoFile(undefined);
            }

            setIsEditing(false);
        } catch {
            setIsEditing(true);
        }
    };

    return (
        <div className="rounded-xl border border-border bg-card p-6 dark:border-dark-border dark:bg-dark-card">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3 dark:border-dark-border">
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary">
                    Seller information
                </p>

                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-primary transition hover:text-primaryHover"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit
                    </button>
                )}
            </div>

            <div className="mb-5 flex items-start gap-4">
                <div className="relative shrink-0">
                    <img
                        src={logo}
                        alt={storeName}
                        className="h-16 w-16 rounded-xl border border-border object-cover dark:border-dark-border"
                    />

                    {isEditing && (
                        <>
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-xl bg-black/50 text-white opacity-0 transition hover:opacity-100 disabled:cursor-not-allowed"
                            >
                                <Camera className="h-5 w-5" />
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleLogoChange}
                                className="hidden"
                            />
                        </>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    {isEditing ? (
                        <div>
                            <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                                Store name
                            </label>

                            <input
                                value={storeName}
                                disabled={isPending}
                                onChange={(e) => setStoreName(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border dark:bg-dark-background dark:text-dark-text"
                                placeholder="Store name"
                            />

                            <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">
                                Your store URL will be updated automatically.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-base font-semibold text-text dark:text-dark-text">
                                {Seller.storeName}
                            </h3>

                            <p className="mt-0.5 text-sm text-text-secondary dark:text-dark-text-secondary">
                                /{Seller.storeSlug}
                            </p>
                        </>
                    )}

                    <div className="mt-2">
                        {Seller.status === "APPROVED" && (
                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 dark:bg-green-950">
                                ✓ Approved
                            </span>
                        )}

                        {Seller.status === "PENDING" && (
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-950">
                                ⏳ Pending approval
                            </span>
                        )}

                        {Seller.status === "REJECTED" && (
                            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 dark:bg-red-950">
                                ✕ Rejected
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                    Store description
                </label>

                {isEditing ? (
                    <textarea
                        value={description}
                        disabled={isPending}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background p-3 text-sm text-text outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border dark:bg-dark-background dark:text-dark-text"
                        placeholder="Describe your store..."
                    />
                ) : (
                    <p className="mt-1.5 rounded-lg border border-border bg-background p-3 text-sm leading-6 text-text dark:border-dark-border dark:bg-dark-background dark:text-dark-text">
                        {Seller.description || "No description provided."}
                    </p>
                )}
            </div>

            {isEditing && (
                <div className="mt-5 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isPending}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950"
                    >
                        <X className="h-4 w-4" />
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isPending || !storeName.trim()}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}

                        {isPending ? "Saving..." : "Save changes"}
                    </button>
                </div>
            )}

            {!isEditing && Seller.status === "APPROVED" && (
                <div className="mt-4 flex gap-2">
                    <Link href="/seller/dashboard">
                        <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-primaryHover"
                        >
                            <Store className="h-4 w-4" />
                            Seller dashboard
                        </button>
                    </Link>

                    <Link
                        href={`/sellers/${Seller.storeSlug}`}
                        target="_blank"
                    >
                        <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-5 py-2 text-sm text-text-secondary transition hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text-secondary"
                        >
                            <ExternalLink className="h-4 w-4" />
                            View store
                        </button>
                    </Link>
                </div>
            )}

            {!isEditing && Seller.status === "REJECTED" && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950">
                    <p className="text-sm text-red-600 dark:text-red-400">
                        Your seller application was rejected. You can reapply with
                        updated information.
                    </p>

                    <Link href="/apply-seller">
                        <button
                            type="button"
                            className="mt-2 cursor-pointer text-sm font-medium text-red-600 hover:underline"
                        >
                            Reapply →
                        </button>
                    </Link>
                </div>
            )}

            {!isEditing && Seller.status === "PENDING" && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                        Your application is under review. We'll notify you once
                        it's approved.
                    </p>
                </div>
            )}
        </div>
    );
}