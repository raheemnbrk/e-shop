import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="px-2 md:px-8">
      <div className="py-16 md:pl-24 md:w-full mx-2 md:mx-auto flex flex-col items-start justify-center text-left bg-gradient-to-b from-[#4C0083] to-[#180047] rounded-2xl p-10 text-white">
        <div className="flex items-center">
          <div className="flex -space-x-3 pr-3">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="image"
              className="size-8 rounded-full hover:-translate-y-px transition z-1"
            />
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="image"
              className="size-8 rounded-full hover:-translate-y-px transition z-[2]"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
              alt="image"
              className="size-8 rounded-full hover:-translate-y-px transition z-[3]"
            />
          </div>
          <div>
            <div className="flex items-center gap-px"></div>
            <p className="text-sm text-gray-300">Used by 12k+ customers</p>
          </div>
        </div>
        <h1 className="text-4xl md:text-[46px] md:leading-[60px] font-semibold mt-5 bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text">
          Ready to try-out this app?
        </h1>
        <p className="bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text text-lg">
          Your next favourite tool is just one click away.
        </p>
        <Link to={"products"} >
          <button className="px-12 py-2.5 text-white border border-purple-600 bg-purple-700/60 hover:bg-purple-800 transition-all rounded-full text-sm mt-4 cursor-pointer">
            Explore products
          </button>
        </Link>
      </div>
    </div>
  );
}
