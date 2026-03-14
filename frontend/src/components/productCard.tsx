import { FaShoppingCart } from "react-icons/fa";

import image from "../assets/images/clothing.jpg";

export default function ProductCard() {
  return (
    <div className="w-72 rounded-lg shadow-xl px-4 py-6 group cursor-pointer bg-white">
      <div>
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img src={image} alt="" className="w-full" />
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex items-center justify-between font-semibold">
            <h1 className="group-hover:text-primary">title</h1>
            <p>$price</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <p>text</p>
          <p className="text-primary font-bold" >(120)</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4" >
          <button className="px-14 py-1 rounded-2xl bg-gray-200 capitalize font-semibold cursor-pointer shadow-lg">
            more details
          </button>
          <button className="bg-primary rounded-full cursor-pointer p-2 text-white" >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
