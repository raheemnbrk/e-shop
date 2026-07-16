export default function CartLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-48 bg-border dark:bg-dark-border rounded-lg" />
          <div className="h-4 w-32 bg-border dark:bg-dark-border rounded mt-2" />
        </div>
        <div className="h-9 w-28 bg-border dark:bg-dark-border rounded-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-xl"
            >
              <div className="h-24 w-24 shrink-0 rounded-lg bg-border dark:bg-dark-border" />
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3.5 bg-border dark:bg-dark-border rounded w-full" />
                    <div className="h-3.5 bg-border dark:bg-dark-border rounded w-3/4" />
                  </div>
                  <div className="h-4 w-4 shrink-0 bg-border dark:bg-dark-border rounded" />
                </div>
                <div className="h-5 w-16 bg-border dark:bg-dark-border rounded" />
                <div className="flex items-center justify-between">
                  <div className="h-8 w-28 bg-border dark:bg-dark-border rounded-lg" />
                  <div className="h-4 w-14 bg-border dark:bg-dark-border rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5 flex flex-col gap-4">
          <div className="h-5 w-32 bg-border dark:bg-dark-border rounded" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-border dark:bg-dark-border rounded" />
              <div className="h-4 w-16 bg-border dark:bg-dark-border rounded" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-border dark:bg-dark-border rounded" />
              <div className="h-4 w-12 bg-border dark:bg-dark-border rounded" />
            </div>
            <div className="border-t border-border dark:border-dark-border pt-3 flex justify-between">
              <div className="h-5 w-12 bg-border dark:bg-dark-border rounded" />
              <div className="h-5 w-16 bg-border dark:bg-dark-border rounded" />
            </div>
          </div>
          <div className="h-10 bg-border dark:bg-dark-border rounded-lg" />
          <div className="h-11 bg-border dark:bg-dark-border rounded-lg" />
          <div className="h-4 w-28 bg-border dark:bg-dark-border rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}
