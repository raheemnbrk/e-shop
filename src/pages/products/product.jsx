import { useState } from "react"
import { Link, useLocation } from "react-router-dom";

import { FaCircleArrowLeft } from "react-icons/fa6";

export default function Product(props) {
    const productElement = props.product
    const originalPrice = (productElement.price / (1 - productElement.discountPercentage / 100)).toFixed(2)
    const location = useLocation()
    const category = location.state?.filterCat || "all"
    const back = location.state?.search || ""

    const [activeImg, setActiveImg] = useState(0)
    return (
        <>
            <div className="p-2 md:p-8">
                <Link to={`..?${back}`} relative="path">
                    <div className="flex gap-2 items-center cursor-pointer textxl font-semibold text-light-text">
                        <FaCircleArrowLeft />
                        <h1>back to {category} products</h1>
                    </div>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <img className="w-64 mx-auto" src={productElement.images[activeImg]} alt={productElement.title} />
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white">{productElement.title}</h1>
                        <h1 className="text-2xl font-bold dark:text-white">${productElement.price}</h1>
                        <div>
                            <div className="flex gap-8">
                                <h1 className="flex gap-4 text-xl font-bold">
                                    <span className="line-through text-dark-text">${originalPrice}</span>
                                    <span className="text-primary">{productElement.discountPercentage}% off</span>
                                </h1>
                                <button className="bg-primary px-4 py-2 text-white rounded-full cursor-pointer font-semibold capitalize hover:scale-105 transition-all duration-300">
                                    <Link to={"card"} >add to card</Link>
                                </button>
                            </div>
                        </div>
                        <h1 className="font-semibold dark:text-white">{productElement.stock} in stock</h1>

                        <div className="mt-4 flex gap-8">
                            {productElement.images.map((ele, ind) => (
                                <img key={ind} className={`w-24 ${activeImg === ind ? "border-2 dark:border-white" : ""} transition-all duration-200 rounded-lg overflow-hidden cursor-pointer`} src={ele} onClick={() => setActiveImg(ind)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}