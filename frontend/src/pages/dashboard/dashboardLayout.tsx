import DashboardNavbar from "../../components/dashboardNavbar";
import { Outlet, NavLink } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdOutlinePayment,
} from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { TbReportAnalytics, TbFileInvoice } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";

export default function DashboardLayout() {
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
    { name: "invoices", path: "invoices", icon: <TbFileInvoice /> },
    { name: "users", path: "users", icon: <FaUsers /> },
  ];
  return (
    <div className="h-screen flex flex-col">
      <DashboardNavbar />

      <div className="flex flex-1">
        <div className="md:w-52 w-16 border-r border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item, index) => (
            <NavLink
              end
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

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
