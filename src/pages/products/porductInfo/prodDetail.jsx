import { useOutletContext } from "react-router-dom"

export default function ProdDetail() {
    const product = useOutletContext()
    return (
        <>
            <div className="p-8 space-y-4">
                <h1>
                    <span className="capitalize font-semibold text-lg">title: </span>
                    <span>{product.title}</span>
                </h1>
                {product.brand && (
                    <h1>
                        <span className="capitalize font-semibold text-lg">brand: </span>
                        <span>{product.brand}</span>
                    </h1>
                )}
                <h1>
                    <span className="capitalize font-semibold text-lg">category: </span>
                    <span>{product.category}</span>
                </h1>
                <h1>
                    <span className="capitalize font-semibold text-lg">description: </span>
                    <span>{product.description}</span>
                </h1>
                <h1>
                    <span className="capitalize font-semibold text-lg">rating: </span>
                    <span>{product.rating}</span>
                </h1>
                <h1>
                    <span className="capitalize font-semibold text-lg">availability: </span>
                    <span>{product.availabilityStatus}</span>
                    <span className="ml-2 text-light-text font-bold">({product.stock})</span>
                </h1>
                <h1>
                    <span className="capitalize font-semibold text-lg">warranty: </span>
                    <span>{product.warrantyInformation}</span>
                </h1>
                <h1>
                    <span className="capitalize font-semibold text-lg">shippingInformation: </span>
                    <span>{product.shippingInformation}</span>
                </h1>
                <h1>
                    <span className="capitalize font-semibold text-lg">returnPolicy: </span>
                    <span>{product.returnPolicy}</span>
                </h1>
                <h1 className="text-2xl font-bold capitalize border-b-2 w-fit">specification:</h1>
                <h1>
                    <span className="capitalize font-semibold text-lg">dimensions: </span>
                    <span>
                        {`${product.dimensions.width}cm * ${product.dimensions.height}cm * ${product.dimensions.depth}cm `}
                    </span>
                </h1>
                <h1>
                    <span className="capitalize font-semibold text-lg">bar code: </span>
                    <span>{product.meta.barcode}</span>
                </h1>
                <h1>
                    <span className="capitalize font-semibold text-lg">created at: </span>
                    <span>{new Date(product.meta.createdAt).toLocaleDateString()}</span>
                </h1>
                <img className="w-24" src={product.meta.qrCode}/>
            </div>
        </>
    )
}