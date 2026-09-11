"use client";

import { useUpdateProfile } from "@/lib/hooks/auth/useUpdateProfile";
import { User } from "@/types/authTypes";
import { Camera, Loader2, Lock, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function PersonalInformation({ user }: { user: User }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border dark:border-dark-border">
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary">
                    Personal information
                </p>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primaryHover transition-colors"
                        >
                            <Pencil className="size-3.5" />
                            Edit
                        </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-lg bg-card dark:bg-dark-card border-border dark:border-dark-border">
                        <DialogHeader>
                            <DialogTitle className="text-text dark:text-dark-text">
                                Edit personal information
                            </DialogTitle>
                        </DialogHeader>

                        <EditProfileForm
                            user={user}
                            onClose={() => setOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative w-fit shrink-0">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.firstName}
                            className="size-20 rounded-full object-cover border-2 border-border dark:border-dark-border"
                        />
                    ) : (
                        <div className="flex size-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-2xl font-bold text-primary">
                            {`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-1 w-full">
                    <div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">
                            First name
                        </p>
                        <p className="text-sm font-medium text-text dark:text-dark-text">
                            {user.firstName || "_"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">
                            Last name
                        </p>
                        <p className="text-sm font-medium text-text dark:text-dark-text">
                            {user.lastName || "_"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">
                            Email address
                        </p>
                        <p className="text-sm font-medium text-text dark:text-dark-text truncate">
                            {user.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">
                            Phone number
                        </p>
                        <p className="text-sm font-medium text-text dark:text-dark-text">
                            {user.phoneNumber || "_"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditProfileForm({ user, onClose }: { user: User; onClose: () => void }) {
    const { updateProfile, isPending } = useUpdateProfile();

    const [profileImage, setProfileImage] = useState<File | undefined>();
    const [removeImage, setRemoveImage] = useState(false);
    const [profileImagePreview, setProfileImagePreview] = useState<string | undefined>();

    const [profileForm, setProfileForm] = useState({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phoneNumber: user.phoneNumber ?? "",
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB.");
            e.target.value = "";
            return;
        }

        setProfileImage(file);
        setRemoveImage(false);

        if (profileImagePreview) URL.revokeObjectURL(profileImagePreview);

        setProfileImagePreview(URL.createObjectURL(file));
    };

    const handleRemoveProfileImage = () => {
        setProfileImage(undefined);
        setRemoveImage(true);

        if (profileImagePreview) URL.revokeObjectURL(profileImagePreview);
        setProfileImagePreview(undefined);

        const input = document.getElementById("dialog-profile-image") as HTMLInputElement | null;
        if (input) input.value = "";
    };

    const handleUpdateProfile = () => {
        updateProfile(
            {
                firstName: profileForm.firstName,
                lastName: profileForm.lastName,
                phoneNumber: profileForm.phoneNumber,
                file: profileImage,
                removeImage,
            },
            {
                onSuccess: () => onClose(),
            },
        );
    };

    const handleCancel = () => {
        if (profileImagePreview) URL.revokeObjectURL(profileImagePreview);
        onClose();
    };

    return (
        <div className="space-y-5 pt-2">
            <div className="flex flex-col items-center gap-3">
                <div className="relative w-fit">
                    {profileImagePreview || (user.image && !removeImage) ? (
                        <img
                            src={profileImagePreview || user.image || ""}
                            alt={user.firstName}
                            className="size-20 rounded-full object-cover border-2 border-border dark:border-dark-border"
                        />
                    ) : (
                        <div className="flex size-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-2xl font-bold text-primary">
                            {`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()}
                        </div>
                    )}

                    <input
                        id="dialog-profile-image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <label
                        htmlFor="dialog-profile-image"
                        className="absolute bottom-0 right-0 flex size-6 cursor-pointer items-center justify-center rounded-full bg-primary border-2 border-card dark:border-dark-card"
                    >
                        <Camera className="size-3 text-white" />
                    </label>
                </div>

                {(user.image || profileImagePreview || removeImage) && (
                    <button
                        type="button"
                        onClick={handleRemoveProfileImage}
                        disabled={isPending}
                        className="cursor-pointer text-xs font-medium text-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Remove photo
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                        First name
                    </label>
                    <input
                        name="firstName"
                        value={profileForm.firstName}
                        onChange={handleProfileChange}
                        className="px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary transition-colors"
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
                        className="px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                        Email address
                    </label>
                    <div className="relative flex items-center">
                        <input
                            disabled
                            value={user.email}
                            className="w-full px-3 py-2.5 pr-9 rounded-lg border border-border dark:border-dark-border bg-border/30 dark:bg-dark-border/30 text-sm text-text-secondary dark:text-dark-text-secondary outline-none cursor-not-allowed"
                        />
                        <Lock className="absolute right-3 size-4 text-text-secondary dark:text-dark-text-secondary" />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                        Phone number
                    </label>
                    <input
                        name="phoneNumber"
                        value={profileForm.phoneNumber}
                        onChange={handleProfileChange}
                        placeholder="+213656780912"
                        className="px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border dark:border-dark-border">
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isPending}
                    className="cursor-pointer rounded-lg border border-red-500 dark:border-red-500 px-5 py-2 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    onClick={handleUpdateProfile}
                    disabled={isPending}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPending && <Loader2 className="size-4 animate-spin" />}
                    {isPending ? "Saving..." : "Save changes"}
                </button>
            </div>
        </div>
    );
}