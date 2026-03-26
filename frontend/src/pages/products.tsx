import { Link } from "react-router-dom";
import ProductCard from "../components/productCard";
import Filter from "../components/products/filter";
import Header from "../components/products/header";
import { useDashboard } from "../zustand/dashboard";
import { useState } from "react";

export default function Products() {
  const { products, dashboardStats } = useDashboard();
  const [sortingKey, setSortingKey] = useState("newest first");

  const sortedProducts =
    sortingKey === "name"
      ? products.sort((a, b) =>
          a.productName
            .toLowerCase()
            .localeCompare(b.productName.toLowerCase()),
        )
      : sortingKey === "price:high to low"
        ? products.sort((a, b) => b.price - a.price)
        : sortingKey === "price:low to high"
          ? products.sort((a, b) => a.price - b.price)
          : products;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  const filteredProducts = sortedProducts.filter((prod) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(prod.category);

    const priceMatch =
      selectedPrices.length === 0 ||
      selectedPrices.some((range) => {
        const [min, max] = range.replace(/\$/g, "").split("-").map(Number);

        return prod.price >= min && prod.price <= max;
      });

    return categoryMatch && priceMatch;
  });

  return (
    <div className="md:px-8 py-4 flex flex-col space-y-6">
      <Header setSortingKey={setSortingKey} />

      <div className="flex gap-24">
        <Filter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedPrices={selectedPrices}
          setSelectedPrices={setSelectedPrices}
        />

        <div className="flex flex-col space-y-2">
          <h1 className="text-gray-500 capitalize px-4">
            showing {filteredProducts.length} of {dashboardStats.totalProducts}
          </h1>

          <div className="flex flex-wrap gap-4">
            {filteredProducts.map((prod) => (
              <Link to={`/products/${prod._id}`}>
                <ProductCard product={prod} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
