import { useState } from "react";

export default function Header() {
  const list = [
    "newest first",
    "price:low to high",
    "price:high to low",
    "name",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(list[0]);

  const handleSelect = (ele: string) => {
    setSelected(ele);
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between p-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold capitalize">
          all products
        </h1>
        <p className="capitalize text-gray-600 font-light">
          find what are you looking for
        </p>
      </div>

      <div className="flex flex-col w-44 text-sm relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
        >
          <span className="capitalize">{selected}</span>
          <svg
            className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
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

        {isOpen && (
          <ul className="w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
            {list.map((ele) => (
              <li
                key={ele}
                className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer capitalize"
                onClick={() => handleSelect(ele)}
              >
                {ele}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
