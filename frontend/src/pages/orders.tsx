import { IoEyeOutline } from "react-icons/io5";

export default function Orders() {
  return (
    <div className="flex flex-col space-y-4 px-6 py-4">
      <h1 className="text-3xl md:text-4xl capitalize font-semibold">
        my orders
      </h1>
      <div className="p-4 border border-gray-300 rounded-lg flex flex-col gap-4 md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col space-y-2" >
          <h1 className="font-bold" >#89</h1>
          <p className="text-gray-500" >placed on march 19th ,2026</p>
          <h1 className="capitalize font-light text-gray-700" >total amount</h1>
          <h1 className="font-semibold" >$200</h1>
        </div>

        <div className="flex flex-col gap-3 items-center" >
          <p className="px-4 py-1 rounded-full capitalize border border-gray-300 w-fit" >status</p>
          <button className="flex items-center gap-2 border border-gray-400 text-gray-600 hover:text-primary hover:border-primary hover:bg-purple-50 rounded-md px-6 py-1 cursor-pointer">
            <IoEyeOutline />
            <p>view details</p>
          </button>
        </div>
      </div>
    </div>
  );
}
