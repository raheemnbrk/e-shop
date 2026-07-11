export default function CardsLoading() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <div className="h-36 bg-border" />
          <div className="p-3 flex flex-col gap-2">
            <div className="h-2.5 w-14 bg-border rounded" />
            <div className="h-3.5 bg-border rounded" />
            <div className="h-3.5 w-3/4 bg-border rounded" />
            <div className="h-4 w-12 bg-border rounded" />
            <div className="h-8 bg-border rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
