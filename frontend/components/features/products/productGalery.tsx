"use client";

import { useState } from "react";
import { Product } from "@/types/productTypes";

export default function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:w-20 md:flex-col">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition cursor-pointer ${
              selectedImage === image
                ? "border-primary opacity-100"
                : "border-border opacity-60 hover:opacity-100 hover:border-primary/50 dark:border-dark-border"
            }`}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="order-1 flex-1 overflow-hidden rounded-xl bg-background dark:bg-dark-background">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-130 object-cover rounded-xl transition duration-300"
        />
      </div>
    </div>
  );
}
