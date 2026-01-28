import { LuCircleUser } from "react-icons/lu";
import { Link } from "react-router-dom"
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";

export default function ResponsiveSideBar(props) {
    const isLogged = true
    const listItems = ["home", "products", "about"]
    return (
        <>
            <div className={`fixed md:hidden z-[999] text-left bg-white w-[65%] dark:bg-darkBg dark:text-dark-text h-full shadow-2xl transition-all duration-300 py-16 px-4 flex flex-col space-y-8 ${props.isOpen ? 'left-0' : 'left-[-100%]'} top-0 bottom-0`}>
                {isLogged ?
                    <div className="flex items-center gap-4 px-4">
                        <LuCircleUser className="text-5xl font-bold text-light-text" />
                        <div className="flex flex-col space-y-1 text-light-text">
                            <h1 className="text-2xl font-semibold">my name</h1>
                            <h1>my name</h1>
                        </div>
                    </div>
                    :
                    <p className="order-2 capitalize text-xl font-semibold px-4 py-2 border-2 text-light-text border-light-text cursor-pointer w-fit rounded-lg" ><Link to={'login'} >login</Link></p>
                }

                <div>
                    <ul className="flex flex-col space-y-6">
                        {listItems.map(ele => (
                            <li className="px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer capitalize text-xl font-semibold text-light-text" key={ele} onClick={() => props.setIsOpen(false)}>
                                <Link to={ele === "home" ? '/' : `${ele}`}>
                                    {ele}
                                </Link>
                            </li>
                        ))}
                        <li
                            className="flex gap-2 items-center px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer capitalize text-xl font-semibold text-light-text"
                            onClick={() => { props.setTheme(`${props.theme === "dark" ? "light" : "dark"}`) }}
                        >
                            {props.theme === "dark" ? <MdSunny /> : <FaMoon />}
                            <h1>{props.theme} mode</h1>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}