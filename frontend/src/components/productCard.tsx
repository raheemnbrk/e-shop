import { FaShoppingCart } from "react-icons/fa";

type Product = {
  _id: string;
  productName: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  image: string;
  stock: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="w-48 md:w-72 rounded-lg shadow-xl px-4 py-6 group cursor-pointer bg-white hover:scale-105 duration-300 transition-all">
      <div>
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img src={product.image} alt="" className="w-full" />
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex items-center justify-between font-semibold">
            <h1 className="group-hover:text-primary">{product.productName}</h1>
            <p>${product.price}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <p>{product.category}</p>
            <p className="text-primary font-bold">({product.stock})</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button className="px-4 md:px-14 py-1 rounded-2xl bg-gray-200 capitalize font-semibold cursor-pointer shadow-lg">
            more details
          </button>
          <button className="bg-primary rounded-full cursor-pointer p-2 text-white">
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
