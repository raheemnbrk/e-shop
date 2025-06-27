import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError()
    return (
        <>
            <div className="p-8 space-y-6 dark:text-white">
                    <h1 >Error : {error.message}</h1>
                    <h1>{error.status} - {error.statusText}</h1>
                    <button className="capitalize text-xl font-semibold text-white bg-light-text dark:bg-dark-text px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                        <Link to={""}>
                            back to home page
                        </Link>
                    </button>
            </div>
        </>
    )
}