import { useLoaderData, defer, Await, NavLink ,Outlet } from "react-router-dom"
import { Suspense } from "react"

import Product from "./product"
import { getProducts } from "../../data"

export function loader({ params }) {
    return defer({ product: getProducts(params.id) })
}

export default function ProductsDetails() {
    const product = useLoaderData()
    return (
        <>
            <div className="p-8">
                <Suspense fallback={<h1>loading....</h1>}>
                    <Await resolve={product.product}>
                        {(product) => {
                            return (
                                <>
                                    <Product product={product} />
                                    <ul className="flex gap-8  text-xl font-semibold capitalize px-8">
                                        <li>
                                            <NavLink end to={"."} className={({isActive}) =>  isActive ? "text-black dark:text-white border-b-2 border-b-black dark:border-b-white" : "text-light-text" }>details</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"reviews"} className={({isActive}) =>  isActive ? "text-black dark:text-white border-b-2 border-b-black dark:border-b-white" : "text-light-text" }>reviews</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"images"} className={({isActive}) =>  isActive ? "text-black dark:text-white border-b-2 border-b-black dark:border-b-white" : "text-light-text" }>photos</NavLink>
                                        </li>
                                    </ul>
                                    <Outlet context={product} />
                                </>
                            )
                        }}
                    </Await>
                </Suspense>
            </div>
        </>
    )
}