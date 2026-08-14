import { User } from "@/types/authTypes";

export function ProfileHeader({ user }: { user: User }) {
    const initials =
        `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

    const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
            <div className="flex items-start gap-5">
                <div className="shrink-0">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.firstName}
                            className="h-20 w-20 rounded-full object-cover border-2 border-border dark:border-dark-border"
                        />
                    ) : (
                        <div className="h-20 w-20 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-2xl font-bold text-primary">
                            {initials}
                        </div>
                    )}
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
    );
}