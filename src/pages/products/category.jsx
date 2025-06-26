import { useState } from "react"

export default function Category(props) {
    const categories = [...new Set(props.products.map(ele => ele.category))]
    const [activeCat , setActiveCat] = useState("")
    return (
        <>
            <div>
                <ul className="flex flex-wrap gap-8 items-center justify-center">
                    {categories.map(ele => (
                        <li
                            onClick={() => { props.setSearchParams(`category=${ele}`) }}
                            className={`${props.filterCat === ele ? "bg-light-text text-white" : "bg-white text-light-text"} border-2 border-light-text text-xl capitalize cursor-pointer rounded-lg px-4 py-2 transition-all duration-200`}>
                            {ele}
                        </li>
                    ))}
                    {props.filterCat && (
                        <li className="text-xl text-light-text capitalize cursor-pointer border-b border-b-light-text" onClick={() => { props.setSearchParams("") }}>clear filter</li>
                    )}
                </ul>
            </div>
        </>
    )
}