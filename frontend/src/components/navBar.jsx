import { LuCircleUser } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaCartShopping, FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { HiOutlineMenuAlt2 , HiOutlineMenuAlt3 } from "react-icons/hi";
import { NavLink , Link } from "react-router-dom"
import { useState } from "react";
import ResponsiveSideBar from "./responsiveSideBar";

export default function NavBar(props) {
    const listItems = ["home", "products", "about"]
    const loggedIn = false
    const [isOpen , setIsOpen] = useState(false)
    return (
        <>
            <div className="p-8 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <NavLink to={"."}> <h1 className="text-3xl uppercase font-bold text-primary">e-shop</h1></NavLink>
                    <div className="hidden md:block">
                        <ul className="flex gap-8 items-center">
                            {listItems.map(ele => (
                                <li key={ele}
                                    className="text-lg text-light-text dark:text-dark-text hover:text-black dark:hover:text-white capitalize font-semibold "  
                                >
                                    <NavLink to={ele === "home" ? "/" : `${ele}`} >{ele}</NavLink>
                                </li>
                            ))}

                            <li className="text-lg text-light-text dark:text-dark-text hover:text-black dark:hover:text-white capitalize font-semibold ">
                                {loggedIn ?
                                    <NavLink to={'profile'}><LuCircleUser /></NavLink> :
                                    <NavLink to={'login'}>login</NavLink>
                                }
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-16 items-center text-light-text">
                    <div className="relative group hidden md:block">
                        <form className="">
                            <input className="search" placeholder="Search..." type="text" />
                            <button className="absolute top-1.5 right-2 group-hover:text-primary text-xl" ><CiSearch /></button>
                        </form>
                    </div>
                    <div className="flex gap-8 items-center text-xl">
                        <button className="cursor-pointer"><Link to={'card'} ><FaCartShopping /></Link></button>
                        <button className="cursor-pointer hidden md:block">
                            {props.theme === "light" ?
                                (<FaMoon onClick={() => { props.setTheme("dark") }} />) :
                                (<MdSunny onClick={() => { props.setTheme("light") }} />)
                            }
                        </button>
                        <button className="cursor-pointer text-xl block md:hidden" onClick={()=>{setIsOpen(prev=>!prev)}}>
                            {isOpen ?
                              <HiOutlineMenuAlt2/>:
                              <HiOutlineMenuAlt3/>
                            }
                        </button>
                    </div>
                </div>
                <ResponsiveSideBar isOpen = {isOpen} setIsOpen={setIsOpen} theme={props.theme} setTheme={props.setTheme} /> 
            </div>
        </>
    )
}