export default function ProductPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="h-3 w-10 rounded bg-border dark:bg-dark-border" />
        <div className="h-3 w-2 rounded bg-border dark:bg-dark-border" />
        <div className="h-3 w-16 rounded bg-border dark:bg-dark-border" />
        <div className="h-3 w-2 rounded bg-border dark:bg-dark-border" />
        <div className="h-3 w-28 rounded bg-border dark:bg-dark-border" />
      </div>

      <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-row gap-2 overflow-x-auto sm:flex-col">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="size-16 shrink-0 rounded-lg bg-border dark:bg-dark-border"
              />
            ))}
          </div>

          <div className="aspect-square flex-1 rounded-xl bg-border dark:bg-dark-border" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-5 w-20 rounded-full bg-border dark:bg-dark-border" />

          <div className="space-y-2">
            <div className="h-6 w-full rounded bg-border dark:bg-dark-border" />
            <div className="h-6 w-3/5 rounded bg-border dark:bg-dark-border" />
          </div>

          <div className="h-4 w-40 max-w-full rounded bg-border dark:bg-dark-border" />
          <div className="h-4 w-1/2 rounded bg-border dark:bg-dark-border" />

          <div className="flex flex-wrap gap-3">
            <div className="h-8 w-20 rounded bg-border dark:bg-dark-border" />
            <div className="h-8 w-14 rounded bg-border dark:bg-dark-border" />
            <div className="h-8 w-14 rounded-full bg-border dark:bg-dark-border" />
          </div>

          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-3 rounded bg-border dark:bg-dark-border"
                style={{ width: `${100 - i * 8}%` }}
              />
            ))}
          </div>

          <div className="h-10 w-28 rounded-lg bg-border dark:bg-dark-border" />

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="h-11 w-full rounded-xl bg-border dark:bg-dark-border sm:flex-1" />
            <div className="h-11 w-full rounded-xl bg-border dark:bg-dark-border sm:flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}