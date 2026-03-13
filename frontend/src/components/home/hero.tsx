import { Link } from "react-router-dom";
import store from '../../assets/images/store.jpg'

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
      <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
        <img
          className="max-w-md w-full object-cover rounded-2xl"
          src={store}
          alt=""
        />
        <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-4 rounded-xl">
          <div className="flex -space-x-4 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="image"
              className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1"
            />
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="image"
              className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
              alt="image"
              className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]"
            />
            <div className="flex items-center justify-center text-xs  text-white size-9 rounded-full border-[3px] border-white bg-indigo-600 hover:-translate-y-1 transition z-[4]">
              50+
            </div>
          </div>
          <p className="text-sm font-medium text-slate-800">
            Shop top brands and sellers
          </p>
        </div>
      </div>
      <div className="text-sm text-slate-600 max-w-lg">
        <h1 className="text-xl uppercase font-semibold text-slate-700">
          About Us?
        </h1>
        <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
        <p className="mt-8">
          Welcome to e-shop where exceptional design meets effortless shopping.
          We're not just another component library; we're your shortcut to
          building beautiful, high-converting online stores that customers love
          to browse and buy from.
        </p>
        <p className="mt-4">
          Think of us as your digital storefront architect. Every component is
          precision-crafted to showcase your products in their best light, guide
          customers seamlessly from discovery to checkout, and turn casual
          visitors into repeat buyers—all while saving you hundreds of hours of
          development time.
        </p>
        <Link
          to={"products"}
          className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white"
        >
          <span>Shop now</span>
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
              fill="#fff"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
