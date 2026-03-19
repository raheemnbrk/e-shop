import { IoWarningOutline } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useState } from "react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

import image from "../../assets/images/store.jpg";

export default function DashboardProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("all categories");

  const categories: string[] = [
    "all categories",
    "home",
    "sport",
    "electronics",
    "clothings",
  ];

  const handleSelect = (cat: string) => {
    setSelected(cat);
    setIsOpen(false);
  };
  return (
    <div className="bg-[#f7f7f5] p-6 flex flex-col space-y-8 w-full">
      <div className="flex flex-col md:flex-row gap-5 justify-between md:items-center">
        <div className="flex flex-col space-y-3">
          <h1 className="text-3xl font-semibold capitalize">Products</h1>
          <p className="text-gray-600 capitalize">
            manage your product catalog
          </p>
        </div>
        <button className="px-6 py-2 bg-primary flex items-center justify-center gap-2 capitalize font-medium cursor-pointer text-white rounded-md">
          <p>+</p>
          <p>add product</p>
        </button>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="w-full md:w-80 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total revenue</h1>
            <p className="text-primary font-semibold text-xl">$</p>
          </div>
          <h1 className="text-2xl font-bold">$1000</h1>
        </div>
        <div className="w-full md:w-80 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total products</h1>
            <MdProductionQuantityLimits className="text-xl font-semibold text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
        <div className="w-full md:w-80 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">low stock</h1>
            <IoWarningOutline className="text-xl font-semibold text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:items-center gap-4 md:gap-8 px-6 py-4 rounded-md bg-white border border-gray-300 shadow-sm">
        <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-[750px] w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#6B7280"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            type="text"
            placeholder="Search product..."
            className="w-full h-full outline-none text-sm text-gray-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 w-32 h-9 rounded-full text-sm text-white mr-[5px]"
          >
            Search
          </button>
        </div>
        <div className="flex flex-col w-44 text-sm relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
          >
            <span className="capitalize">{selected}</span>
            <svg
              className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-50">
              {categories.map((ele) => (
                <li
                  key={ele}
                  className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer capitalize"
                  onClick={() => handleSelect(ele)}
                >
                  {ele}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        <div className="w-full overflow-x-auto rounded-md bg-white border border-gray-200 shadow-sm">
          <table className="w-full text-sm text-left">

            <thead className="hidden md:table-header-group text-gray-700 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-600">
              <tr className="border-t border-t-gray-300 hover:bg-[#f7f7f5] transition">

                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={image}
                    alt="Product"
                    className="w-14 h-14 object-cover rounded hidden md:block"
                  />

                  <div className="flex flex-col gap-2">
                    <span className="font-medium">product name</span>

                    <span className="md:hidden text-xs font-semibold capitalize px-3 py-1 bg-gray-200 rounded-full w-fit">
                      product cat
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="px-2 py-1 bg-gray-200 rounded-full">
                    category
                  </span>
                </td>

                <td className="px-4 py-3 hidden md:table-cell">$30</td>

                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="px-2 py-1 bg-gray-200 rounded-full">29</span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 md:gap-4 justify-center text-lg">
                    <button className="p-2 hover:bg-gray-200 rounded-full transition cursor-pointer">
                      <FaEdit />
                    </button>

                    <button className="p-2 hover:bg-red-100 rounded-full transition cursor-pointer">
                      <FaRegTrashAlt className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
