export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-text dark:text-dark-text">Admin Dashboard</h1>
                <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
                    Overview of your store performance and management tools.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Total Users", value: "0" },
                    { label: "Total Products", value: "0" },
                    { label: "Orders", value: "0" },
                    { label: "Revenue", value: "$0" },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-dark-border dark:bg-dark-card"
                    >
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{item.label}</p>
                        <p className="mt-3 text-3xl font-bold text-text dark:text-dark-text">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
