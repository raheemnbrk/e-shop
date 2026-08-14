"use client";

import { AddressInformation } from "@/components/features/profile/addresses";
import { BecomeSeller } from "@/components/features/profile/becomeSeller";
import { ChangePassword } from "@/components/features/profile/changePassword";
import { DangerZone } from "@/components/features/profile/dangerZone";
import { PersonalInformation } from "@/components/features/profile/personalInformation";
import { ProfileHeader } from "@/components/features/profile/profileHeader";
import { ProfileStats } from "@/components/features/profile/profileStats";
import { SellerInformation } from "@/components/features/profile/sellerInformation";
import { ProfileSkeleton } from "@/components/loading/profileSkeleton";
import { useGetMe } from "@/lib/hooks/auth/usGetMe";

export default function MyProfile() {
    const { data: user, isLoading } = useGetMe();

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-text dark:text-dark-text">
                    My profile
                </h1>

                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                    Manage your personal information and account settings
                </p>
            </div>

            <ProfileHeader user={user} />

            <ProfileStats />

            <PersonalInformation user={user} />

            <AddressInformation
            />

            <ChangePassword />

            {user.role === "SELLER" ? (
                user.Seller ? (
                    <SellerInformation Seller={user.Seller} />
                ) : null
            ) : (
                user.role === "CUSTOMER" && <BecomeSeller />
            )}

            <DangerZone />
        </div>
    );
}