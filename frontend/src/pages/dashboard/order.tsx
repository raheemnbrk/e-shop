import { useState } from "react";
import { LuBox } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function DashboardOrders() {
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("all status");

  const status: string[] = [
    "all status",
    "pending",
    "processing",
    "delivered",
    "cancelled",
  ];

  const handleSelect = (cat: string) => {
    setSelected(cat);
    setIsOpen(null);
  };
  return (
    <div className="bg-[#f7f7f5] p-6 flex flex-col space-y-8 w-full">
      <div>
        <h1 className="text-3xl font-semibold capitalize">orders</h1>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
        <div className="w-full md:w-48 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total orders</h1>
            <LuBox />
          </div>
          <h1 className="text-2xl font-bold">$1000</h1>
        </div>
        <div className="w-full md:w-48 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">pending</h1>
            <FiClock className="text-xl font-semibold text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
        <div className="w-full md:w-48 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">processing</h1>
            <CiDeliveryTruck className="text-xl font-semibold text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
        <div className="w-full md:w-48 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">delivered</h1>
            <FaCheckCircle className="text-xl font-semibold text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-600">20</h1>
        </div>
        <div className="w-full md:w-48 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">cancelled</h1>
            <MdCancel className="text-xl font-semibold text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-red-600">20</h1>
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
            onClick={() =>
              setIsOpen((prev) => (prev === "filter" ? null : "filter"))
            }
            className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
          >
            <span className="capitalize">{selected}</span>
            <svg
              className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen==="filter" ? "rotate-0" : "-rotate-90"}`}
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

          {isOpen === "filter" && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-50">
              {status.map((ele) => (
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
        <h2 className="pb-4 text-lg font-medium capitalize">all orders</h2>

        <div className="w-full overflow-x-auto rounded-md bg-white border border-gray-200 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="hidden md:table-header-group text-gray-700 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold capitalize">order id</th>
                <th className="px-4 py-3 font-semibold capitalize">date</th>
                <th className="px-4 py-3 font-semibold capitalize">status</th>
                <th className="px-4 py-3 font-semibold capitalize">amount</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-600">
              <tr className="border-t border-t-gray-300 hover:bg-[#f7f7f5] transition">
                <td className="px-4 py-3 flex flex-col gap-3 ">
                  <p className="mt-2 font-medium">23</p>
                  <p className="md:hidden">march 25 , 2026</p>
                  <p className="text-xl font-bold md:hidden">$100</p>
                </td>

                <td className="px-4 py-3 hidden md:table-cell">
                  March 19,2026
                </td>

                <td className="px-4 py-3 hidden md:table-cell">delivered</td>

                <td className="px-4 py-3 hidden md:table-cell font-semibold">
                  $190
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 md:gap-4 justify-center text-lg ml-8">
                    <div className="flex flex-col w-28 md:w-44 text-sm relative">
                      <button
                        type="button"
                        onClick={() =>
                          setIsOpen((prev) => (prev === "row" ? null : "row"))
                        }
                        className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
                      >
                        <span className="capitalize">{selected}</span>
                        <svg
                          className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen === "row" ? "rotate-0" : "-rotate-90"}`}
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

                      {isOpen === "row" && (
                        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-50">
                          {status.map((ele) => (
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

                    <button className="p-2 hover:bg-purple-100 rounded-full transition cursor-pointer hidden md:block">
                      <FaEye className="text-primary" />
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
