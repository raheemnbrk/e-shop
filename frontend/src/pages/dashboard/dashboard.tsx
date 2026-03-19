import { IoCartOutline, IoWarningOutline } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";

export default function DashBoard() {
  return (
    <div className="bg-[#f7f7f5] p-6 flex flex-col space-y-8 w-full">
      <h1 className="text-3xl font-semibold capitalize">dashboard</h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total revenue</h1>
            <p className="text-primary font-semibold text-xl">$</p>
          </div>
          <h1 className="text-2xl font-bold" >$1000</h1>
        </div>
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total orders</h1>
            <IoCartOutline className="text-xl font-semibold text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total products</h1>
            <MdProductionQuantityLimits className="text-xl font-semibold text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">low stock</h1>
            <IoWarningOutline  className="text-xl font-semibold text-gray-600"/>
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:flex-[50%] flex flex-col space-y-6 bg-white border border-gray-300 shadow-sm rounded-md px-6 py-6">
          <h1 className="text-2xl font-semibold capitalize">recent orders</h1>
          <div className="flex items-center justify-between" >
            <p>order-90</p>
            <p>status</p>
            <p>159</p>
          </div>
        </div>
        <div className="w-full md:flex-[50%] flex flex-col space-y-6 bg-white border border-gray-300 shadow-sm rounded-md px-6 py-6">
          <h1 className="text-2xl font-semibold capitalize">low stock products</h1>
          <div className="flex items-center justify-between" >
            <p>title</p>
            <p className="text-red-500 font-semibold capitalize ">3 left</p>
          </div>
        </div>
      </div>
    </div>
  );
}
