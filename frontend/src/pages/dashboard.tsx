import { NavLink, Outlet } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdOutlinePayment,
} from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";

export default function DashBoard() {
  const sidebarLinks = [
    { name: "Dashboard", path: "", icon: <MdOutlineDashboard /> },
    {
      name: "products",
      path: "products",
      icon: <MdProductionQuantityLimits />,
    },
    { name: "orders", path: "orders", icon: <IoCartOutline /> },
    { name: "payment", path: "payment", icon: <MdOutlinePayment /> },
    { name: "reports", path: "reports", icon: <TbReportAnalytics /> },
    { name: "users", path: "users", icon: <FaUsers /> },
  ];
  return (
    <div>
      <div className="md:w-52 w-16 h-[100vh] border-r text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
        {sidebarLinks.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 cursor-pointer capitalize ${isActive ? "bg-purple-50 text-primary border-r-4 border-r-primary" : "text-gray-600 hover:bg-gray-100 hover:text-black"}`
            }
          >
            {item.icon}
            <p className="md:block hidden text-center">{item.name}</p>
          </NavLink>
        ))}
      </div>
      {/* <Outlet /> */}
    </div>
  );
}
