import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <>
          <div className="p-8 space-y-8 text-center">
             <h1 className="text-xl font-semibold dark:text-white capitalize">this page is not found</h1>
             <button className="capitalize text-xl font-semibold text-white bg-light-text dark:bg-dark-text px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <Link to={""}>
                  back to home page
                </Link>
             </button>
            </div>   
        </>
    )
}