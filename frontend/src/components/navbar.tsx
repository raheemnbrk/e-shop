import { useState, type JSX } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { LuSun, LuMoon } from "react-icons/lu";
import { useAuthUser } from "../zustand/authUser";
import { FaBoxOpen } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { useAuth } from "../queries/authUser";

interface NavbarProps {
  theme: string;
  setTheme: (theme: string) => void;
  setTitle: (title: string) => void;
}

interface profileLink {
  text: string;
  link: string;
  icon: JSX.Element;
}

export default function Navbar({ theme, setTheme, setTitle }: NavbarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const profileLinks: profileLink[] = [
    { text: "my orders", link: "orders", icon: <FaBoxOpen /> },
    { text: "my profile", link: "my-profile", icon: <FaUser /> },
  ];

  const { user } = useAuthUser();

  const { logout } = useAuth();
  const handleLogout = () => {
    logout.mutate();
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const isProductsPage = location.pathname === "/products";
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <h1 className="bg-primary px-2 py-0.5 rounded-sm text-white text-xl font-bold">
            e
          </h1>
          <h1 className="text-xl font-bold">e-shop</h1>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          to={"/products"}
        >
          Products
        </NavLink>

        {isProductsPage && (
          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
              onChange={(e) => setTitle(e.target.value)}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                clip-rule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}

        <button
          className="text-xl cursor-pointer text-gray-700 font-light"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <LuSun /> : <LuMoon />}
        </button>
        <Link to={"cart"}>
          <div className="relative cursor-pointer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              3
            </button>
          </div>
        </Link>

        {!user ? (
          <Link to={"login"}>
            <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex flex-col w-44 text-sm">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="peer group bg-purple-100 text-primary w-fit mx-auto px-3 py-2 cursor-pointer relative rounded-full font-semibold"
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </button>

            {isOpen && (
              <ul className="w-36 bg-white border border-gray-300 rounded shadow-md mt-1 py-2 absolute top-full right-0 mr-8 z-50">
                {profileLinks.map((ele, ind) => (
                  <Link to={ele.link} key={ind}>
                    <li
                      className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer flex gap-2 items-center capitalize"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <p>{ele.icon}</p>
                      <p>{ele.text}</p>
                    </li>
                  </Link>
                ))}
                {user.role === "admin" && (
                  <Link to={"dashboard"}>
                    <li
                      className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer flex gap-2 items-center capitalize"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <RiAdminFill />
                      <p>dashboard</p>
                    </li>
                  </Link>
                )}
                <li
                  className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer flex gap-2 items-center capitalize"
                  onClick={handleLogout}
                >
                  <TbLogout />
                  <p>logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden cursor-pointer"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"} absolute top-[60px] z-50 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to={"/"} onClick={() => setOpen(!open)} className="block">
          Home
        </Link>
        <Link to={"products"} onClick={() => setOpen(!open)} className="block">
          Products
        </Link>

        <button
          className="flex items-center gap-2 capitalize cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <LuSun /> : <LuMoon />}
          <h1>{theme === "dark" ? `light mode` : `dark mode`}</h1>
        </button>
        {!user && (
          <Link to={"login"} onClick={() => setOpen(!open)}>
            <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
              Login
            </button>
          </Link>
        )}
        {user && (
          <Link
            to={"my-profile"}
            onClick={() => setOpen(!open)}
            className="block"
          >
            my-profile
          </Link>
        )}
        {user && (
          <Link to={"orders"} onClick={() => setOpen(!open)} className="block">
            my orders
          </Link>
        )}
        {user && user.role === "admin" && (
          <Link
            to={"dashboard"}
            onClick={() => setOpen(!open)}
            className="block"
          >
            dashboard
          </Link>
        )}
        {user && (
          <button
            className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
