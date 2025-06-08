import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSunny , IoIosMoon , IoMdArrowDropdown } from "react-icons/io";

export default function NavBar(props){
  
    const listItem = ["home" , "shop" , "about" ,"blogs"]

    const dropDwonLinks = ["bext selling" , "top products" , "top rating"]

    return(
        <>
          <div className="flex justify-between items-center px-12 py-6 dark:bg-night"> 
            <div className="flex gap-8 items-center">
                <h1 className="text-3xl text-primary cursor-pointer font-semibold uppercase tracking-widest">eshop</h1>
                <div className="hidden lg:block">
                    <ul className="flex gap-12">
                        {listItem.map((ele , ind) => (
                            <li className="cursor-pointer text-secondary  dark:text-gray-night hover:text-black capitalize dark:hover:text-white text-lg" key={ind}>{ele}</li>
                        ))}

                        <li className="relative cursor-pointer group">
                            <p className="flex items-center  text-secondary dark:text-gray-night hover:text-black dark:hover:text-white text-lg">
                                Quick Links
                                <span className="group-hover:rotate-180"><IoMdArrowDropdown/></span>
                            </p>

                            <div className="dark:bg-night">
                                <ul className="flex flex-col space-y-2">
                                    {dropDwonLinks.map((ele , ind) =>(
                                        <li key={ind} className="text-secondary hover:text-black dark:text-gray-night dark:hover:text-white hover:bg-primary p-2 rounded-lg">{ele}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-between items-center gap-8">
                <div className="items-center group relative hidden sm:block" >
                    <input type="text" className="searchBar" placeholder="Search.." />
                    <IoSearchOutline className="absolute right-4 bottom-2 text-xl text-secondary dark:text-gray-night font-semibold group-hover:text-primary duration-200"/>
                </div>

                <div className="flex gap-4 items-center">
                    <button className="relative p-3">
                        <FaShoppingCart className="text-xl cursor-pointer text-secondary  dark:text-gray-night"/>
                        <div className="w-4 h-4 items-center justify-center rounded-full bg-primary text-white absolute top-0 right-0 flex" >4</div>
                    </button>

                    <button>
                        {props.theme === "dark" ?
                           <IoMdSunny className="text-2xl cursor-pointer text-secondary  dark:text-gray-night rounded-full" onClick={()=>props.setTheme("light")}/> :
                           <IoIosMoon className="text-2xl cursor-pointer text-secondary  dark:text-gray-night rounded-full" onClick={()=>props.setTheme("dark")}/>
                        }
                    </button>
                </div>
            </div>
          </div>
        </>
    )
}