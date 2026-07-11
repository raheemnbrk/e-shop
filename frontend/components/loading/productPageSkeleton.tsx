// components/features/products/productPageSkeleton.tsx
export default function ProductPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-3 w-10 bg-border rounded" />
        <div className="h-3 w-2 bg-border rounded" />
        <div className="h-3 w-16 bg-border rounded" />
        <div className="h-3 w-2 bg-border rounded" />
        <div className="h-3 w-28 bg-border rounded" />
      </div>

      {/* Gallery + Info */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-16 h-16 bg-border rounded-lg" />
            ))}
          </div>
          <div className="flex-1 aspect-square bg-border rounded-xl" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-5 w-20 bg-border rounded-full" />
          <div className="h-6 bg-border rounded" />
          <div className="h-6 w-3/5 bg-border rounded" />
          <div className="h-4 w-40 bg-border rounded" />
          <div className="h-4 w-1/2 bg-border rounded" />
          <div className="flex gap-3">
            <div className="h-8 w-20 bg-border rounded" />
            <div className="h-8 w-14 bg-border rounded" />
            <div className="h-8 w-14 bg-border rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-3 bg-border rounded" />
            ))}
          </div>
          <div className="h-10 w-28 bg-border rounded-lg" />
          <div className="flex gap-3">
            <div className="h-11 flex-1 bg-border rounded-xl" />
            <div className="h-11 flex-1 bg-border rounded-xl" />
          </div>
        </div>
      </div>

      {/* Related products */}
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
    </div>
  );
}
