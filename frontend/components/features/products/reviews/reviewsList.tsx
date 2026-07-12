import { Star } from "lucide-react";
import ReviewCard from "./reviewCard";
import { Review } from "@/types/productTypes";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text dark:text-dark-text">
            Customer Reviews
          </h2>
          <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
            See what customers think about this product.
          </p>
        </div>

        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card px-6 py-4">
          <div className="text-3xl font-bold text-text dark:text-dark-text">
            {average.toFixed(1)}
          </div>
          <div className="mt-2 flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(average) ? "fill-current" : "text-border dark:text-dark-border"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
            Based on {reviews.length} reviews
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          No reviews yet. Be the first to review this product.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review , index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}