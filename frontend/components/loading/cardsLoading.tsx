export default function  CardsLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card overflow-hidden"
        >
          <div className="h-44 bg-border dark:bg-dark-border" />
          <div className="p-3 space-y-2">
            <div className="h-2.5 w-16 bg-border dark:bg-dark-border rounded" />
            <div className="h-3.5 bg-border dark:bg-dark-border rounded" />
            <div className="h-3.5 w-3/4 bg-border dark:bg-dark-border rounded" />
            <div className="h-4 w-12 bg-border dark:bg-dark-border rounded" />
            <div className="h-9 bg-border dark:bg-dark-border rounded-lg mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
