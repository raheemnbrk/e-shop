import { Review } from "@/types/productTypes";
import { Star } from "lucide-react";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {review.user.image ? (
            <img
              src={review.user.image}
              alt={`${review.user.firstName} ${review.user.lastName}`}
              className="h-10 w-10 rounded-full object-cover border border-border dark:border-dark-border"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold uppercase text-primary">
              {review.user.firstName[0]}
              {review.user.lastName[0]}
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-text dark:text-dark-text">
              {review.user.firstName} {review.user.lastName}
            </h4>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "fill-current"
                  : "text-border dark:text-dark-border"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-text-secondary dark:text-dark-text-secondary">
        {review.comment}
      </p>
    </div>
  );
}
