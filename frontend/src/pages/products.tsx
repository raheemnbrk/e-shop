import Filter from "../components/products/filter";
import Header from "../components/products/header";
import ProductsList from "../components/products/productsList";

export default function Products() {
  return (
    <div className="md:px-8 py-4 flex flex-col space-y-6">
      <Header />
      <div className="flex gap-24">
        <Filter />
        <ProductsList />
      </div>
    </div>
  );
}
