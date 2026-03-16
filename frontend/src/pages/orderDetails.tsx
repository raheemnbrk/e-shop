import { GoClock } from "react-icons/go";
import { FaBox, FaRegCircleCheck, FaDownload } from "react-icons/fa6";
import image from "../assets/images/store.jpg";

export default function OrderDetails() {
  return (
    <div className="flex flex-col md:flex-row gap-10 px-4 md:px-8 py-4">
      <div className="flex flex-col gap-4 w-full md:w-[70%]">
        <div className="px-8 py-4 border border-gray-300 rounded-md shadow-sm">
          <h1 className="text-lg font-semibold capitalize">89</h1>
          <p className="text-gray-600">
            order placed on monday march 19th , 2026
          </p>
        </div>
        <div className="px-8 py-4 border border-gray-300 shadow-sm rounded-md">
          <h1 className="text-lg font-semibold capitalize">order status</h1>
          <div className="flex items-center justify-between mt-6">
            <div className="flex flex-col gap-2 items-center">
              <GoClock className="text-primary text-2xl" />
              <h1 className="font-medium capitalize text-gray-600">
                order placed
              </h1>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <FaBox className="text-primary text-2xl" />
              <h1 className="font-medium capitalize text-gray-600">
                processing
              </h1>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <FaRegCircleCheck className="text-primary text-2xl" />
              <h1 className="font-medium capitalize text-gray-600">
                delivered
              </h1>
            </div>
          </div>
        </div>
        <div className="px-8 py-4 border border-gray-300 shadow-sm rounded-md">
          <h1 className="text-lg font-semibold capitalize">order items</h1>
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center gap-2 mt-6">
              <img src={image} className="w-24 rounded-md" alt="" />
              <div>
                <h1 className="font-semibold text-lg">title</h1>
                <p className="text-gray-600 font-light"> qty 1x$200</p>
              </div>
            </div>
            <h1 className="text-xl font-semibold">$200</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 w-full md:w-[30%]">
        <div className="px-8 py-4 border border-gray-300 shadow-sm rounded-md flex flex-col space-y-3">
          <h1 className="text-xl capitalize font-semibold">order summary</h1>
          <div className="border-b border-b-gray-500 py-2">
            <div className="flex justify-between items-center font-light mb-2 capitalize">
              <h1>subtotal</h1>
              <p>$200</p>
            </div>
            <div className="flex justify-between items-center font-light mb-2 capitalize">
              <h1>subtotal</h1>
              <p>$200</p>
            </div>
            <div className="flex justify-between items-center font-light mb-2 capitalize">
              <h1>subtotal</h1>
              <p>$200</p>
            </div>
          </div>
          <div className="flex items-center justify-between font-semibold capitalize">
            <h1>total</h1>
            <p>$200</p>
          </div>
        </div>
        <div className="px-8 py-4 border border-gray-300 shadow-sm rounded-md flex flex-col space-y-3">
          <h1 className="text-xl font-semibold capitalize">shipping address</h1>
          <div className="font-light text-gray-600">
            <h1 className="font-semibold text-black">lamin tipana</h1>
            <p>blassa wa3ra 3lik</p>
            <p>0662457920</p>
          </div>
        </div>
        <div className="px-8 py-4 border border-gray-300 shadow-sm rounded-md flex flex-col space-y-3">
          <h1 className="text-xl font-semibold capitalize">payment method</h1>
          <div className="flex items-center justify-between">
            <h2 className="capitalize">cash on delivery</h2>
            <p className="px-6 py-1 font-semibold border border-primary rounded-full">
              status
            </p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-4 capitalize font-medium border border-gray-300 shadow-sm px-8 py-2 rounded-md cursor-pointer">
          <FaDownload />
          <p>download invoice</p>
        </button>
      </div>
    </div>
  );
}
