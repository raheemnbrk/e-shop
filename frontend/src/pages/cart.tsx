import image from "../assets/images/store.jpg";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

export default function Cart() {
  return (
    <div className="p-6 flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold capitalize">
          shopping cart
        </h1>
        <button className="font-semibold capitalize px-6 py-2 cursor-pointer hover:bg-purple-50 hover:text-primary rounded-md">
          clear cart
        </button>
      </div>
      <div className="flex flex-col gap-8 md:flex-row items-start">
        <div className="flex flex-col border border-gray-300 shadow-sm rounded-md w-full md:w-[70%]">
          <div className="flex items-center justify-between group p-6">
            <div className="flex items-center gap-4">
              <img className="w-28 rounded-md" src={image} alt="" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-36">
                <div>
                  <h1 className="group-hover:text-primary text-xl font-semibold capitalize">
                    title
                  </h1>
                  <p className="text-gray-600 font-light">$300each</p>
                </div>
                <div className="flex items-center gap-12 md:gap-36">
                  <div className="flex items-center border border-gray-400 w-fit rounded-md font-semibold">
                    <p className="px-3 py-1 border-r border-r-gray-300 cursor-pointer hover:bg-purple-100">
                      -
                    </p>
                    <p className="px-4 py-1">1</p>
                    <p className="px-3 py-1 border-l border-l-gray-300 cursor-pointer hover:bg-purple-100">
                      +
                    </p>
                  </div>
                  <h1 className="text-xl font-semibold">$300</h1>
                </div>
              </div>
            </div>
            <button className="hover:bg-red-50 hover:text-red-500 rounded-full p-3 w-fit cursor-pointer hidden md:flex">
              <FaRegTrashAlt />
            </button>
          </div>
          <button className="flex items-center justify-center text-red-500 gap-2 capitalize font-medium md:hidden p-2 md:p-6 border-t border-t-gray-300">
            <FaRegTrashAlt />
            <p>clear cart</p>
          </button>
        </div>

        <div className="w-full md:w-[30%] p-6 border border-gray-300 shadow-sm rounded-md flex flex-col space-y-4">
          <h1 className="text-xl font-semibold capitalize">order summary</h1>
          <div className="py-3 border-b border-b-gray-400 flex flex-col space-y-3">
            <div className="text-gray-700 font-light flex items-center justify-between capitalize">
              <h1>subtotal</h1>
              <h1>$300</h1>
            </div>
            <div className="text-gray-700 font-light flex items-center justify-between capitalize">
              <h1>subtotal</h1>
              <h1>$300</h1>
            </div>
            <div className="text-gray-700 font-light flex items-center justify-between capitalize">
              <h1>subtotal</h1>
              <h1>$300</h1>
            </div>
          </div>
          <div className="flex items-center justify-between text-xl font-semibold capitalize">
            <h1>total</h1>
            <p>$300</p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center rounded-md gap-2 cursor-pointer bg-primary text-white py-2 px-6 w-full capitalize font-medium">
              <p>proceed to checkout</p>
              <FaArrowRight />
            </button>
            <button className="capitalize font-medium cursor-pointer border border-gray-300 shadow-sm rounded hover:border-none hover:bg-purple-50 hover:text-primary py-2 px-6">
              continue shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
