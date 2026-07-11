import { PackageSearch } from "lucide-react";

export default function NoFoundProduct() {
  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text">Related Products</h2>

        <p className="mt-2 text-text-secondary">
          You might also like these products.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <PackageSearch className="h-8 w-8 text-primary" />
        </div>

        <h3 className="mt-6 text-xl font-semibold text-text">
          No Related Products
        </h3>

        <p className="mt-2 max-w-md text-sm text-text-secondary">
          We couldn't find any similar products right now. Check back later or
          browse other categories.
        </p>
      </div>
    </section>
  );
}
