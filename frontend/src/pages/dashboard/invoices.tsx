import { FaDownload, FaEye } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";

export default function Invoices() {
  return (
    <div className="bg-[#f7f7f5] p-6 flex flex-col space-y-8 w-full">
      <h1 className="text-3xl font-semibold capitalize">user management</h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total users</h1>
            <TbFileInvoice className="text-xl font-semibold text-primary" />
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total revenue</h1>
            <p className="text-xl font-semibold text-blue-600">$</p>
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">this month</h1>
            <SlCalender className="text-xl font-semibold text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">20</h1>
        </div>
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">this month revenue</h1>
            <p className="text-primary font-semibold text-xl">$</p>
          </div>
          <h1 className="text-2xl font-bold">$1000</h1>
        </div>
      </div>
      <div className="px-6 py-4 rounded-md bg-white border border-gray-300 shadow-sm">
        <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden w-full">
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
      </div>
      <div className="flex flex-col px-3 md:px-6 py-4 rounded-md border border-gray-300 shadow-sm gap-6">
        <h1 className="text-xl font-semibold capitalize flex items-center gap-2">
          <TbFileInvoice />
          all invoices(0)
        </h1>
        <div className="w-full overflow-x-auto rounded-md bg-white border border-gray-200 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="hidden md:table-header-group text-gray-700 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold capitalize">
                  invoice id
                </th>
                <th className="px-4 py-3 font-semibold capitalize">customer</th>
                <th className="px-4 py-3 font-semibold capitalize text-center">
                  order id
                </th>
                <th className="px-4 py-3 font-semibold capitalize text-center">
                  date
                </th>
                <th className="px-4 py-3 font-semibold text-center capitalize">
                  amount
                </th>
                <th className="px-4 py-3 font-semibold text-center capitalize">
                  status
                </th>
                <th className="px-4 py-3 font-semibold text-center capitalize">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-600">
              <tr className="border-t border-t-gray-300 hover:bg-[#f7f7f5] transition">
                <td className="px-4 py-3 flex flex-col gap-3 mt-3">
                  <p>3</p>
                  <p className="md:hidden flex gap-4">
                    jabolani
                    <span className="text-green-600 font-medium">cancelled</span>
                  </p>
                </td>

                <td className="px-4 py-3 hidden md:table-cell">
                  sayd lmwechem
                </td>

                <td className="px-4 py-3 hidden md:table-cell text-center">
                  9
                </td>

                <td className="px-4 py-3 hidden md:table-cell text-center">
                  march 19 ,2026
                </td>

                <td className="px-4 py-3 text-center hidden md:table-cell font-bold">
                  $120
                </td>
                <td className="px-4 py-3 text-center hidden md:table-cell">
                  <p className="font-semibold capitalize px-2 py-1 bg-gray-200 rounded-full" >cancelled</p>
                </td>
                <td className="px-4 py-3 md:flex md:items-center md:justify-center md:gap-2">
                  <button className="text-lg font-semibold hover:bg-gray-200 cursor-pointer rounded-full p-3">
                    <FaEye />
                  </button>
                  <button className="text-lg font-semibold hover:bg-purple-100 hover:text-primary cursor-pointer rounded-full p-3">
                    <FaDownload  />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
