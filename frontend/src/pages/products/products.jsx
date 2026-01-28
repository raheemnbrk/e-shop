import { useLoaderData, defer, Await, useSearchParams } from "react-router-dom"
import { Suspense } from "react"

import UpperSection from "./upperSection"
import Category from "./category"
import ProductsCard from "./productsCard"
import { getProducts } from "../../data"

import LoadingPage from "../../components/loadingPage"

export function loader() {
    return defer({ products: getProducts() })
}

export default function Products() {
    const products = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    return (
        <>
            <div className="p-8 space-y-6">
                <UpperSection />

                <Suspense fallback={<LoadingPage/>}>
                    <Await resolve={products.products}>
                        {(products) => {
                            const filterCat = searchParams.get("category")
                            const filterdProducts = filterCat ?
                                products.filter((prod) => prod.category === filterCat) :
                                products
                            return (
                                <>
                                    <Category products={products} setSearchParams={setSearchParams} filterCat={filterCat} />
                                    <ProductsCard products={filterdProducts} searchParams={searchParams} filterCat={filterCat} />
                                </>
                            )
                        }}
                    </Await>
                </Suspense>
            </div>
        </>
    )
}