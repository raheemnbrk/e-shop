import { useDeleteUser } from "@/lib/hooks/auth/useDeleteUser";
import { ConfirmationDialog } from "../layout/confirmationButton";

export function DangerZone() {
    const { deleteUser, isPending } = useDeleteUser()
    return (
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-card dark:bg-dark-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 pb-3 border-b border-red-200 dark:border-red-900">
                Danger zone
            </p>

            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4 leading-6">
                Once you delete your account, all your data including orders,
                reviews, and personal information will be permanently removed.
                This action cannot be undone.
            </p>

            <ConfirmationDialog
                title="Delete user?"
                description="This will permanently delete this user and all of its associated data."
                actionText="Delete User"
                triggerText="Delete"
                onConfirm={() => deleteUser()}
            />
        </div>
    );
}