import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import sport from "../../assets/images/sport.jpeg";
import clothing from "../../assets/images/clothing.jpg";
import home from "../../assets/images/home.jpg";
import electronics from "../../assets/images/electronics.jpg";

export default function Categories() {
  const categories = [
    { image: clothing, text: "clothings" },
    { image: home, text: "home" },
    { image: electronics, text: "electronics" },
    { image: sport, text: "sport" },
  ];
  return (
    <div className="md:p-8 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl capitalize font-semibold">
            shop by category
          </h1>
          <p className="text-gray-500">Find what you're looking for</p>
        </div>
        <Link to={"categories"}>
          <button className="flex items-center justify-center gap-2 capitalize font-medium cursor-pointer group">
            <h1>View all</h1>
             <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 mt-8" >
        {categories.map((ele, ind) => (
          <div key={ind} className="relative w-48 md:w-74 rounded-lg cursor-pointer overflow-hidden group h-32 md:h-48">
            <img src={ele.image} alt="" className="w-full  group-hover:scale-105 transition brightness-50 duration-300" />
            <h1 className="absolute top-[80%] ml-1.5 md:ml-6 text-white font-medium text-xl capitalize" >{ele.text}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
