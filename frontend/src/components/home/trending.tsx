import ProductCard from "../productCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Trending() {
  return (
    <div className="py-6 md:px-6 bg-amber-50 flex flex-col space-y-8">
      <div className="flex items-center justify-between md:px-6 px-4">
        <div>
          <h1 className="text-3xl capitalize font-semibold">
            trending products
          </h1>
          <p className="text-gray-500">Find what you're looking for</p>
        </div>
        <Link to={"products"}>
          <button className="flex items-center justify-center gap-2 capitalize font-medium cursor-pointer group">
            <h1>View all</h1>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mx-auto">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
