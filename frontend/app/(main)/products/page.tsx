import Search from "@/components/features/products/search";

export default function Products() {
  return (
    <div className="flex flex-col space-y-6" >
      <div>
        <h1 className="text-2xl capitalize font-semibold">all products</h1>
        <p className="text-sm font-light text-text-secondary dark:text-dark-text-secondary">
          Discover thousands of products from verified sellers
        </p>
      </div>
      <Search />
    </div>
  );
}
