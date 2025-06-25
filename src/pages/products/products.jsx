import { useLoaderData, defer, Await, Link } from "react-router-dom"
import { Suspense } from "react"

import UpperSection from "./upperSection"
import Category from "./category"
import ProductsCard from "./productsCard"
import { getProducts } from "../../data"

export function loader() {
    return defer({ products: getProducts() })
}

export default function Products() {
    const products = useLoaderData()
    console.log(products)
    return (
        <>
            <div className="p-8 space-y-6">
                <UpperSection />

                <Suspense fallback={<h1>loading....</h1>}>
                    <Await resolve={products.products}>
                        {(products) => {
                            return (
                                <>
                                    <Category products={products} />
                                    <ProductsCard products={products} />
                                </>
                            )
                        }}
                    </Await>
                </Suspense>
            </div>
        </>
    )
}