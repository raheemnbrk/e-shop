import image from "../assets/images/store.jpg";
import { RiStarSFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import ProductCard from "../components/productCard";

export default function ProductDetails() {
  return (
    <div className="px-6 py-4 flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="overflow-hidden rounded-md w-full md:w-[50%]">
          <img className="w-full rounded-md" src={image} alt="" />
        </div>
        <div className="flex flex-col space-y-4 w-full md:w-[50%]">
          <p className="px-6 py-1 rounded-full bg-purple-100 text-primary font-medium capitalize w-fit">
            category
          </p>
          <h1 className="text-2xl font-semibold capitalize">title</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-yellow-500 text-xl">
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
            </div>
            <p className="text-gray-600">(876)reviews</p>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">$300</h1>
            <h1 className="text-gray-600 line-through font-medium">$400</h1>
            <p className="px-6 py-1 rounded-full bg-purple-100 text-primary font-medium capitalize w-fit">
              save 30%
            </p>
          </div>
          <p className="text-gray-600 py-3 border-b border-b-gray-700">
            description
          </p>
          <div>
            <h1 className="text-xl font-semibold capitalize">quantity</h1>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center border border-gray-400 w-fit rounded-md font-semibold">
                <p className="px-5 py-2 border-r border-r-gray-300 cursor-pointer">
                  -
                </p>
                <p className="px-8 py-2">1</p>
                <p className="px-5 py-2 border-l border-l-gray-300 cursor-pointer">
                  +
                </p>
              </div>
              <p className="text-gray-600 font-semibold">120 available</p>
            </div>
          </div>
          <button className="flex items-center justify-center px-6 py-2 gap-4 rounded-md capitalize mt-4 bg-primary text-white cursor-pointer">
            <FaShoppingCart />
            <p>add to cart</p>
          </button>
        </div>
      </div>
      <div className="w-full border-b border-b-gray-300 pt-8">
        <ul className="flex items-center gap-8">
          <NavLink
            to={""}
            end
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-primary pb-2 text-gray-800 capitalize font-medium"
                : "text-gray-600 capitalize font-medium"
            }
          >
            <li>description</li>
          </NavLink>
          <NavLink
            to={"specifications"}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-primary pb-2 text-gray-800 capitalize font-medium"
                : "text-gray-600 capitalize font-medium"
            }
          >
            <li>specifications</li>
          </NavLink>
          <NavLink
            to={"reviews"}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-primary pb-2 text-gray-800 capitalize font-medium"
                : "text-gray-600 capitalize font-medium"
            }
          >
            <li>reviews(100)</li>
          </NavLink>
        </ul>
      </div>
      <Outlet />
      <div className="flex flex-col space-y-6" >
        <h1 className="text-3xl md:text-4xl font-semibold capitalize" >related products</h1>
        <div className="flex items-center gap-6 bg-amber-50 rounded-md md:p-6 py-3" >
            <ProductCard/>
            <ProductCard/>
        </div>
      </div>
    </div>
  );
}
