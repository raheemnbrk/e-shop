type Props = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPrices: string[];
  setSelectedPrices: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Filter({
  selectedCategories,
  setSelectedCategories,
  selectedPrices,
  setSelectedPrices,
}: Props) {
  const categories = ["electronics", "clothings", "home", "sports", "books"];
  const price_range = [
    "$0-$200",
    "$200-$400",
    "$400-$800",
    "$800-$1500",
    "$1500-$2000",
  ];

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const togglePrice = (range: string) => {
    setSelectedPrices((prev) =>
      prev.includes(range) ? prev.filter((p) => p !== range) : [...prev, range],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
  };

  return (
    <div className="md:flex flex-col gap-12 hidden">
      <h1 className="capitalize font-semibold">filters</h1>

      {/* Categories */}
      <div className="flex flex-col gap-4">
        <p className="capitalize font-semibold">categories</p>

        {categories.map((ele) => (
          <label key={ele} className="flex gap-3 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(ele)}
              onChange={() => toggleCategory(ele)}
            />
            <span className="capitalize">{ele}</span>
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="flex flex-col gap-4">
        <p className="capitalize font-semibold">price range</p>

        {price_range.map((ele) => (
          <label key={ele} className="flex gap-3 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedPrices.includes(ele)}
              onChange={() => togglePrice(ele)}
            />
            <span>{ele}</span>
          </label>
        ))}
      </div>

      <button onClick={clearFilters} className="border px-2 py-1 rounded hover:border-primary hover:text-primary hover:bg-purple-50 cursor-pointer capitalize ">
        clear all filters
      </button>
    </div>
  );
}
