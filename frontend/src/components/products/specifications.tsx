export default function Specification() {
  return (
    <div  className="flex flex-col space-y-2">
      <div className="p-3 border-b border-gray-300 flex items-center justify-between w-full md:w-[40%]">
        <h1 className="text-gray-600 capitalize font-medium">price</h1>
        <h1 className="font-semibold capitalize">$80</h1>
      </div>
      <div className="p-3 border-b border-gray-300 flex items-center justify-between w-full md:w-[40%]">
        <h1 className="text-gray-600 capitalize font-medium">category</h1>
        <h1 className="font-semibold capitalize">electronics</h1>
      </div>
      <div className="p-3 border-b border-gray-300 flex items-center justify-between w-full md:w-[40%]">
        <h1 className="text-gray-600 capitalize font-medium">stock</h1>
        <h1 className="font-semibold capitalize">90</h1>
      </div>
    </div>
  );
}
