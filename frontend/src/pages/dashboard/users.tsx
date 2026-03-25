import { useEffect, useState } from "react";
import { FaRegUser, FaUsers, FaEdit, FaUser } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useDashboard } from "../../zustand/dashboard";
import { useUsersQueries } from "../../queries/dashboard/users";
import { IoClose } from "react-icons/io5";

type selected = "all users" | "admin" | "customer";

export default function Users() {
  const [selected, setSelected] = useState<selected>("all users");
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | "">("");
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<"admin" | "customer">("customer");
  const [openRole, setOpenRole] = useState<boolean>(false);
  const status: string[] = ["all users", "admin", "customer"];

  const handleSelect = (ele: selected): void => {
    setSelected(ele);
    setOpen(false);
  };

  const { users, dashboardStats } = useDashboard();
  const { getUsers, updateUser } = useUsersQueries(value);
  useEffect(() => {
    getUsers.refetch();
  }, [value]);

  const filteredUsers =
    selected !== "all users"
      ? users.filter((ele) => ele.role === selected)
      : users;

  const handleUpdateUser = (id: string) => {
    updateUser.mutate({ id, firstName, lastName, role });
    setEditingUser(null);
  };
  return (
    <div className="bg-[#f7f7f5] p-6 flex flex-col space-y-8 w-full relative">
      <h1 className="text-3xl font-semibold capitalize">user management</h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total users</h1>
            <FaUsers className="text-xl font-semibold text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{dashboardStats.totalUsers}</h1>
        </div>
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">customers</h1>
            <FaRegUser className="text-xl font-semibold text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold">
            {dashboardStats.totalCustomers}
          </h1>
        </div>
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">admins</h1>
            <MdOutlineAdminPanelSettings className="text-xl font-semibold text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">{dashboardStats.totalAdmins}</h1>
        </div>
        <div className="w-full md:w-62 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total revenue</h1>
            <p className="text-primary font-semibold text-xl">$</p>
          </div>
          <h1 className="text-2xl font-bold">$1000</h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:items-center gap-4 px-6 py-4 rounded-md bg-white border border-gray-300 shadow-sm">
        <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-11 rounded-full overflow-hidden max-w-3xl w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#6B7280"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            type="text"
            placeholder="Search user by name or email..."
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-full outline-none text-sm text-gray-500"
          />
        </div>
        <div className="flex flex-col w-44 text-sm relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full text-left px-4 pr-2 py-2 border bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer rounded-full h-[46px]"
          >
            <span className="capitalize">{selected}</span>
            <svg
              className={`w-5 h-5 inline float-right transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {open && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-50">
              {status.map((ele) => (
                <li
                  key={ele}
                  className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer capitalize"
                  onClick={() => handleSelect(ele as selected)}
                >
                  {ele}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col px-2 md:px-6 py-4 rounded-md border border-gray-300 shadow-sm gap-6">
        <h1 className="text-xl font-semibold capitalize flex items-center gap-2">
          <FaUsers />
          all users({filteredUsers.length})
        </h1>
        <div className="w-full overflow-x-auto rounded-md bg-white border border-gray-200 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="hidden md:table-header-group text-gray-700 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold capitalize">user</th>
                <th className="px-4 py-3 font-semibold capitalize">email</th>
                <th className="px-4 py-3 font-semibold capitalize text-center">
                  phone
                </th>
                <th className="px-4 py-3 font-semibold capitalize text-center">
                  role
                </th>
                <th className="px-4 py-3 font-semibold text-center capitalize">
                  orders
                </th>
                <th className="px-4 py-3 font-semibold text-center capitalize">
                  total spent
                </th>
                <th className="px-4 py-3 font-semibold text-center capitalize">
                  Actions
                </th>
              </tr>
            </thead>

            {filteredUsers.map((ele, ind) => (
              <tbody key={ind} className="text-gray-600">
                <tr className="border-t border-t-gray-300 hover:bg-[#f7f7f5] transition">
                  <td className="px-4 py-3 flex flex-col gap-3 ">
                    <p className="mt-2 font-medium flex gap-2 items-center">
                      <span className="rounded-full px-3 py-2 bg-purple-100 text-primary">
                        {ele.firstName[0]}
                        {ele.lastName[0]}
                      </span>
                      <span>
                        {ele.firstName} {ele.lastName}
                      </span>
                    </p>
                    <p className="md:hidden flex gap-4">
                      {ele.email}
                      <span
                        className={`${ele.role === "admin" ? "text-green-600" : "text-gray-600"} font-medium`}
                      >
                        {ele.role}
                      </span>
                    </p>
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    {ele.email}
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell text-center">
                    0909090909
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell font-semibold">
                    <div
                      className={`font-semibold capitalize ${ele.role === "admin" ? "bg-green-600" : "bg-gray-500"} w-fit px-2 py-1 rounded-full flex items-center justify-center text-white gap-1 ml-4`}
                    >
                      {ele.role === "admin" ? (
                        <MdOutlineAdminPanelSettings />
                      ) : (
                        <FaUser />
                      )}
                      <p>{ele.role}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    120
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    120
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="text-lg font-semibold hover:bg-gray-200 cursor-pointer rounded-full p-3"
                      onClick={() => {
                        setEditingUser(ele);
                        setFirstName(ele.firstName);
                        setLastName(ele.lastName);
                        setRole(ele.role);
                      }}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {editingUser && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="bg-white px-6 py-8 rounded-md w-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold ">Edit User</h2>
                  <button
                    className="text-2xl font-light cursor-pointer hover:text-red-500 hover:bg-red-100 p-1 rounded-full"
                    onClick={() => setEditingUser(null)}
                  >
                    <IoClose />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border p-2 rounded outline-primary border-gray-300 shadow-md"
                    placeholder="First name"
                  />

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border p-2 rounded outline-primary border-gray-300 shadow-md"
                    placeholder="Last name"
                  />
                  <div className="flex flex-col  text-sm relative">
                    <button
                      type="button"
                      onClick={() => setOpenRole(!openRole)}
                      className="w-full text-left px-4 pr-2 py-2 border bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer h-11"
                    >
                      <span className="capitalize">{role}</span>
                      <svg
                        className={`w-5 h-5 inline float-right transition-transform duration-200 ${openRole ? "rotate-0" : "-rotate-90"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6B7280"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {openRole && (
                      <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-50">
                        <li
                          className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer capitalize"
                          onClick={() => {
                            setRole("admin");
                            setOpenRole(false);
                          }}
                        >
                          admin
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer capitalize"
                          onClick={() => {
                            setRole("customer");
                            setOpenRole(false);
                          }}
                        >
                          customer
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="flex gap-2 items-center justify-end mt-6">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </button>

                    <button
                      className="bg-primary hover:bg-primary/90 cursor-pointer text-white px-4 py-2 rounded"
                      onClick={() => handleUpdateUser(editingUser._id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
