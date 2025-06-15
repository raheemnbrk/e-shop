import { IoIosSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaMoon , FaCaretDown } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

export default function NavBar(props){

    const listItem = ["home" , "shop" , "about" , "blogs"]
    const dropDownList = ["trending products" , "best selling" , "top rated"]

    return(
        <>
          <div className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center gap-8">
                <h1 className="text-2xl sm:text-3xl text-primary tracking-widest uppercase font-semibold cursor-pointer">eshop</h1>
                <div className="hidden sm:block">
                    <ul className="flex items-center gap-8">
                        {listItem.map((ele , ind) =>(
                            <li 
                               key={ind}
                               className="capitalize text-lg text-primary-text cursor-pointer font-semibold hover:text-black dark:hover:text-white" 
                            >
                                {ele}
                            </li>
                        ))}
                        <li 
                          className="capitalize text-lg text-primary-text cursor-pointer font-semibold
                           dark:hover:text-white flex items-center gap-1 group relative" 
                        >
                            quick links
                            <FaCaretDown className="group-hover:rotate-180 transition-all duration-300"/>

                            <div className="absolute z-[9999] hidden group-hover:block bg-white dark:bg-night w-[200px] rounded-md shadow-md p-2 dark:text-primary-text top-6">
                                 <ul className="space-y-2 group" >
                                    {dropDownList.map((ele , ind) =>(
                                        <li 
                                          key={ind}
                                          className="hover:text-black dark:hover:text-white p-2 hover:bg-red-300 dark:hover:bg-red-400 rounded-md "
                                        >
                                            {ele}
                                        </li>
                                    ))}
                                 </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="group relative items-center hidden sm:block">
                    <input className="searchBar" type="text" placeholder="Search.."/>
                    <IoIosSearch className="text-xl text-primary-text font-semibold group-hover:text-primary absolute bottom-2 right-3 duration-200"/>
                </div>

                <div className="flex items-center gap-8">
                    <button className="relative p-3 cursor-pointer">
                        <FaCartShopping className="text-primary-text text-xl z-50"/>
                        <div className="absolute top-0 right-0 w-4 h-6 text-sm z-0 rounded-full text-white bg-primary">4</div>
                    </button>

                    {props.theme === "light" ?
                      (<FaMoon 
                        className="text-primary-text text-2xl cursor-pointer"
                        onClick={()=>{props.setTheme("dark")}}
                      />) : 
                      (<MdSunny
                        className="text-primary-text text-2xl cursor-pointer"
                        onClick={()=>{props.setTheme("light")}}
                      />)
                    }
                </div>
            </div>
          </div>
        </>
    )
}