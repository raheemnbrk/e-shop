"use client";

import { useState } from "react";
import { Product } from "@/types/productTypes";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:w-24 md:flex-col">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition cursor-pointer ${
              selectedImage === image
                ? "border-primary"
                : "border-border hover:border-primary/50"
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

      <div className="order-1 flex-1 overflow-hidden rounded-lg">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full aspect-square object-cover rounded-lg"
        />
      </div>
    </div>
  );
}