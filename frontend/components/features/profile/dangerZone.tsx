export function DangerZone() {
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

            <button className="px-5 py-2 rounded-lg border border-red-200 dark:border-red-900 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition cursor-pointer">
                Delete account
            </button>
        </div>
    );
}