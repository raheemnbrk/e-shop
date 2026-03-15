import ProductCard from "../productCard";

export default function ProductsList() {
  return (
    <div className="flex flex-col space-y-2" >
      <h1 className="text-gray-500 capitalize px-4" >showing 100 of 100</h1>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mx-auto bg-amber-50 md:px-4 py-6 rounded-lg">
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
