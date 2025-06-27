import { Link } from "react-router-dom"

export default function ProductsCard(props) {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {props.products.map(ele => (
                    <Link
                        to={`${ele.id}`}
                        key={ele.id}
                        state={{ search: props.searchParams.toString() , filterCat: props.filterCat }}
                    >
                        <div className="bg-white dark:bg-secondDarkBg h-[380px] space-y-6 p-4 border-2 border-gray-200 shadow-xl rounded-lg hover:scale-105 transition-all duration-300" >
                            <img className="w-48 mx-auto" src={ele.images[0]} alt={ele.title} />
                            <div className="space-y-1.5">
                                <h1 className="text-xl text-light-text dark:text-dark-text font-bold capitalize">{ele.title}</h1>
                                <h1 className="text-2xl font-bold dark:text-white">{ele.price}$</h1>
                                <h1 className="dark:text-white">{ele.stock} in stock</h1>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}