import { useLoaderData, defer, Await } from "react-router-dom"
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
                                </>
                            )
                        }}
                    </Await>
                </Suspense>
            </div>
        </>
    )
}