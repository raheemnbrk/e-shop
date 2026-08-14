"use client";

import { useRef, useState } from "react";
import {
    Store,
    Camera,
    Loader2,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApplySeller } from "@/lib/hooks/seller/useApplySeller";

export default function ApplySellerPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [storeName, setStoreName] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | undefined>();

    const { applySeller, isPending } = useApplySeller();

    const handleLogoChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setLogoFile(file);
        setLogo(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedStoreName = storeName.trim();
        const trimmedDescription = description.trim();

        if (!trimmedStoreName || !trimmedDescription || !logoFile) {
            return;
        }

        try {
            await applySeller({
                storeName: trimmedStoreName,
                description: trimmedDescription,
                file: logoFile,
            });

            router.push("/my-profile");
        } catch {
            return;
        }
    };

    return (
        <div className="min-h-screen bg-background px-4 py-10 dark:bg-dark-background">
            <div className="mx-auto w-full max-w-2xl">
                <Link
                    href="/my-profile"
                    className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-primary dark:text-dark-text-secondary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to profile
                </Link>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm dark:border-dark-border dark:bg-dark-card sm:p-8">
                    <div className="mb-8">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Store className="h-6 w-6" />
                        </div>

                        <h1 className="text-2xl font-bold text-text dark:text-dark-text">
                            Become a seller
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-text-secondary dark:text-dark-text-secondary">
                            Create your store and start selling your products on our
                            marketplace.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-text dark:text-dark-text">
                                Store logo
                            </label>

                            <div className="flex items-center gap-5">
                                <div className="relative h-24 w-24 shrink-0">
                                    {logo ? (
                                        <img
                                            src={logo}
                                            alt="Store logo preview"
                                            className="h-24 w-24 rounded-2xl border border-border object-cover dark:border-dark-border"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-border bg-background dark:border-dark-border dark:bg-dark-background">
                                            <Store className="h-8 w-8 text-text-secondary dark:text-dark-text-secondary" />
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        disabled={isPending}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </button>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={handleLogoChange}
                                        className="hidden"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-text dark:text-dark-text">
                                        Upload your logo
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-text-secondary dark:text-dark-text-secondary">
                                        PNG, JPG or WEBP
                                        <br />
                                        Recommended size: 500 × 500px
                                    </p>

                                    <button
                                        type="button"
                                        disabled={isPending}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="mt-2 cursor-pointer text-sm font-medium text-primary hover:text-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Choose image
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="storeName"
                                className="mb-2 block text-sm font-medium text-text dark:text-dark-text"
                            >
                                Store name
                            </label>

                            <input
                                id="storeName"
                                type="text"
                                value={storeName}
                                disabled={isPending}
                                onChange={(e) => setStoreName(e.target.value)}
                                placeholder="e.g. Tech Store"
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-secondary focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border dark:bg-dark-background dark:text-dark-text"
                            />

                            <p className="mt-1.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                                Your store URL will be generated automatically from your
                                store name.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-text dark:text-dark-text"
                            >
                                Store description
                            </label>

                            <textarea
                                id="description"
                                value={description}
                                disabled={isPending}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell customers about your store..."
                                rows={6}
                                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-6 text-text outline-none transition placeholder:text-text-secondary focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border dark:bg-dark-background dark:text-dark-text"
                            />

                            <p className="mt-1.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                                Describe what you sell and what makes your store unique.
                            </p>
                        </div>

                        <div className="rounded-lg border border-border bg-background p-4 dark:border-dark-border dark:bg-dark-background">
                            <p className="text-sm font-medium text-text dark:text-dark-text">
                                What happens next?
                            </p>

                            <p className="mt-1 text-sm leading-6 text-text-secondary dark:text-dark-text-secondary">
                                After submitting your application, our team will review
                                your information. You will be notified once your seller
                                application has been approved.
                            </p>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-border pt-6 dark:border-dark-border">
                            <Link
                                href="/my-profile"
                                className="flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text-secondary"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={
                                    isPending ||
                                    !storeName.trim() ||
                                    !description.trim() ||
                                    !logoFile
                                }
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isPending && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}

                                {isPending
                                    ? "Submitting..."
                                    : "Submit application"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}