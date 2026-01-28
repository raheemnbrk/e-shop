import { useOutletContext } from "react-router-dom"

export default function ProductImages() {
    const product = useOutletContext()
    return (
        <>
            <div className="flex gap-6 p-8">
                {product.images.map((ele) => (
                    <div key={ele} className="border-2 border-light-text cursor-pointer rounded-lg overflow-hidden w-24">
                        <img className="w-full" src={ele} />
                    </div>
                ))}
            </div>
        </>
    )
}