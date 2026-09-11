"use client";

import { useAddReview } from "@/lib/hooks/products/useAddReview";
import { Star, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const { handleAddReview, isPending } = useAddReview();

  const handleSubmit = () => {
    if (!rating || !comment.trim()) return;

    handleAddReview(
      { productId, input: { rating, comment } },
      {
        onSuccess: () => {
          setRating(0);
          setHoveredRating(0);
          setComment("");
        },
      },
    );
  };

  const activeRating = hoveredRating || rating;

  return (
    <section className="mt-12 rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
          <MessageSquare className="size-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-text dark:text-dark-text">
            Leave a Review
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-0.5">
            Share your experience with this product
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text dark:text-dark-text mb-2.5">
          Your rating
        </label>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index + 1)}
              onMouseEnter={() => setHoveredRating(index + 1)}
              onMouseLeave={() => setHoveredRating(0)}
              className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
              aria-label={`Rate ${index + 1} star${index > 0 ? "s" : ""}`}
            >
              <Star
                className={`size-8 transition-colors ${index < activeRating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  }`}
              />
            </button>
          ))}
          {activeRating > 0 && (
            <span className="ml-3 flex items-center text-sm font-semibold text-amber-500">
              {activeRating} / 5
            </span>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-text dark:text-dark-text mb-2.5">
          Your review
        </label>
        <textarea
          value={comment}
          placeholder="Share your experience with this product..."
          onChange={(e) => setComment(e.target.value)}
          className="h-36 w-full resize-none rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background p-4 text-sm text-text dark:text-dark-text placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        {(rating > 0 || comment.trim()) && (
          <button
            type="button"
            onClick={() => {
              setRating(0);
              setHoveredRating(0);
              setComment("");
            }}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-red-200 px-5 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
          >
            Clear
          </button>
        )}

        <button
          onClick={handleSubmit}
          disabled={isPending || !rating || !comment.trim()}
          className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primaryHover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Submitting...
            </span>
          ) : (
            "Submit Review"
          )}
        </button>
      </div>
    </section>
  );
}