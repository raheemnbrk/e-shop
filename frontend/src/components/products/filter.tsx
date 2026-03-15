export default function Filter() {
  const categories = ["electronics", "clothings", "home", "sports", "books"];
  const price_range = ["$0-$200", "$200-$400", "$400-$800", "$800-$1500", "$1500-$2000"];
  return (
    <div className="md:flex flex-col gap-12 hidden">
      <h1 className="capitalize font-semibold">filters</h1>
      <div className="flex flex-col gap-4">
        <p className="capitalize font-semibold">categories</p>
        <div className="flex flex-col gap-2">
          {categories.map((ele, ind) => (
            <label className="flex gap-3 items-center cursor-pointer" key={ind}>
              <input type="checkbox" className="hidden peer" />
              <span className="w-5 h-5 border border-slate-300 rounded-full relative flex items-center justify-center peer-checked:after:content-[''] peer-checked:after:w-2.5 peer-checked:after:h-2.5 peer-checked:after:bg-primary peer-checked:after:rounded-full peer-checked:after:absolute"></span>
              <span className="text-gray-700 select-none capitalize">
                {ele}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="capitalize font-semibold">price range:</p>
         <div className="flex flex-col gap-2">
          {price_range.map((ele, ind) => (
            <label className="flex gap-3 items-center cursor-pointer" key={ind}>
              <input type="checkbox" className="hidden peer" />
              <span className="w-5 h-5 border border-slate-300 rounded-full relative flex items-center justify-center peer-checked:after:content-[''] peer-checked:after:w-2.5 peer-checked:after:h-2.5 peer-checked:after:bg-primary peer-checked:after:rounded-full peer-checked:after:absolute"></span>
              <span className="text-gray-700 select-none capitalize">
                {ele}
              </span>
            </label>
          ))}
        </div>
      </div>
      <button className="capitalize border border-gray-400 text-gray-600 hover:border-primary hover:text-primary rounded-md py-1 px-2 cursor-pointer" >clear all filters</button>
    </div>
  );
}
