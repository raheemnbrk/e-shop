"use client";

import { useUpdateProfile } from "@/lib/hooks/auth/useUpdateProfile";
import { User } from "@/types/authTypes";
import { Camera, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";



export function PersonalInformation({ user }: { user: User }) {
    const { updateProfile, isPending } = useUpdateProfile();

    const [profileImage, setProfileImage] = useState<File | undefined>();
    const [removeImage, setRemoveImage] = useState(false);

    const [profileImagePreview, setProfileImagePreview] = useState<
        string | undefined
    >();

    const [profileForm, setProfileForm] = useState({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phoneNumber: user.phoneNumber ?? "",
    });

    const handleProfileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProfileForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB.");
            e.target.value = "";
            return;
        }

        setProfileImage(file);
        setRemoveImage(false);

        if (profileImagePreview) {
            URL.revokeObjectURL(profileImagePreview);
        }

        const previewUrl = URL.createObjectURL(file);

        setProfileImagePreview(previewUrl);
    };

    const handleRemoveProfileImage = () => {
        setProfileImage(undefined);
        setRemoveImage(true);

        if (profileImagePreview) {
            URL.revokeObjectURL(profileImagePreview);
        }

        setProfileImagePreview(undefined);

        const input = document.getElementById(
            "profile-image"
        ) as HTMLInputElement | null;

        if (input) {
            input.value = "";
        }
    };

    const handleUpdateProfile = () => {
        updateProfile({
            firstName: profileForm.firstName,
            lastName: profileForm.lastName,
            phoneNumber: profileForm.phoneNumber,
            file: profileImage,
            removeImage,
        });
    };

    const handleCancelProfile = () => {
        setProfileForm({
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            phoneNumber: user.phoneNumber ?? "",
        });

        setProfileImage(undefined);
        setRemoveImage(false);

        if (profileImagePreview) {
            URL.revokeObjectURL(profileImagePreview);
        }

        setProfileImagePreview(undefined);

        const input = document.getElementById(
            "profile-image"
        ) as HTMLInputElement | null;

        if (input) {
            input.value = "";
        }
    };

    return (
        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary mb-4 pb-3 border-b border-border dark:border-dark-border">
                Personal information
            </p>

            <div className="mb-6">
                <div className="relative w-fit">
                    {profileImagePreview || user.image && !removeImage ? (
                        <img
                            src={profileImagePreview || user.image || ""}
                            alt={user.firstName}
                            className="h-20 w-20 rounded-full object-cover border-2 border-border dark:border-dark-border"
                        />
                    ) : (
                        <div className="h-20 w-20 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-2xl font-bold text-primary">
                            {`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""
                                }`.toUpperCase()}
                        </div>
                    )}

                    <input
                        id="profile-image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary border-2 border-card dark:border-dark-card flex items-center justify-center cursor-pointer"
                    >
                        <Camera className="h-3 w-3 text-white" />
                    </label>
                </div>

                {(user.image || profileImagePreview || removeImage) && (
                    <button
                        type="button"
                        onClick={handleRemoveProfileImage}
                        disabled={isPending}
                        className="mt-3 text-sm font-medium text-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Remove photo
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                        First name
                    </label>

                    <input
                        name="firstName"
                        value={profileForm.firstName}
                        onChange={handleProfileChange}
                        className="px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                        Last name
                    </label>

                    <input
                        name="lastName"
                        value={profileForm.lastName}
                        onChange={handleProfileChange}
                        className="px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                        Email address
                    </label>

                    <div className="relative flex items-center">
                        <input
                            disabled
                            value={user.email}
                            className="w-full px-3 py-2.5 pr-9 rounded-lg border border-border dark:border-dark-border bg-border/30 dark:bg-dark-border/30 text-sm text-text-secondary dark:text-dark-text-secondary outline-none cursor-not-allowed"
                        />

                        <Lock className="absolute right-3 h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                        Phone number
                    </label>

                    <input
                        name="phoneNumber"
                        value={profileForm.phoneNumber}
                        onChange={handleProfileChange}
                        placeholder="+213656780912"
                        className="px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary"
                    />
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button
                    type="button"
                    onClick={handleCancelProfile}
                    disabled={isPending}
                    className="px-5 py-2 rounded-lg border border-red-200 dark:border-red-900 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition cursor-pointer">
                    Cancel
                </button>

                <button
                    onClick={handleUpdateProfile}
                    disabled={isPending}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPending && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {isPending ? "Saving..." : "Save changes"}
                </button>
            </div>
        </div>
    );
}