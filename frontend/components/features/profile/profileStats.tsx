const stats = [
    { label: "Total orders", value: "24", icon: "🛍️" },
    { label: "Total spent", value: "$1,840", icon: "💳" },
    { label: "Wishlist items", value: "12", icon: "❤️" },
    { label: "Reviews left", value: "8", icon: "⭐" },
];

export function ProfileStats() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-4 text-center"
                >
                    <p className="text-2xl mb-1">{stat.icon}</p>

                    <p className="text-lg font-bold text-text dark:text-dark-text">
                        {stat.value}
                    </p>

                    <p className="text-[11px] uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary mt-0.5">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    );
}