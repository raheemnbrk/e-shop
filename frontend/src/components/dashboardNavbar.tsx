import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

export default function DashboardNavbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-300 shadow-sm" >
        <Link to="">
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <h1 className="bg-primary px-2 py-0.5 rounded-sm text-white text-xl font-bold">
              e
            </h1>
            <h1 className="text-xl font-bold">e-shop admin</h1>
          </div>
        </Link>
        <Link to={"/"}>
          <button className="px-6 py-2 rounded-md cursor-pointer capitalize font-medium hover:text-primary hover:bg-purple-50 flex items-center gap-2 justify-center">
            <FaRegUser />
            <p>customer view</p>
          </button>
        </Link>
    </div>
  );
}
