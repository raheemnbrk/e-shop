"use client";

import { useAddReview } from "@/lib/hooks/products/useAddReview";
import { Star } from "lucide-react";
import { useState } from "react";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { handleAddReview, isPending } = useAddReview();

  const handleSubmit = () => {
    if (!rating) return;
    if (!comment.trim()) return;
    handleAddReview({ productId, input: { rating, comment } });
  };

  return (
    <section className="mt-12 rounded-xl border border-border p-6">
      <h2 className="text-2xl font-bold">Leave a Review</h2>

      <div className="mt-6 flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setRating(index + 1)}
            className="cursor-pointer"
          >
            <Star
              className={`h-7 w-7 transition ${
                index < rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        placeholder="Share your experience..."
        className="mt-6 h-36 w-full rounded-lg border border-border p-4 outline-none focus:border-primary"
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={isPending || !rating || !comment.trim()}
        className="mt-4 rounded-lg bg-primary px-8 py-3 text-sm font-medium text-white transition hover:bg-primaryHover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </button>
    </section>
  );
}
