import { IoClose, IoWarningOutline } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

import { FaCamera } from "react-icons/fa6";
import { useProduct } from "../../queries/dashboard/products";
import { useDashboard } from "../../zustand/dashboard";

export default function DashboardProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("all categories");

  const [status, setStatus] = useState<"add" | "update" | null>(null);
  const [editingProd, setEditingProd] = useState<any | null>(null);
  const [productCategory, setProductCategory] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productDiscount, setProductDiscount] = useState<number | null>(null);
  const [inStock, setInStock] = useState<number | null>(null);
  const [prodImage, setProdImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const categories: string[] = [
    "all categories",
    "home",
    "sport",
    "electronics",
    "clothings",
  ];

  const handleSelect = (cat: string) => {
    setSelected(cat);
    setIsOpen(false);
  };

  const [title, setTitle] = useState<string>("");
  const { addProduct, getAllProducts, deleteProduct, updateProduct } =
    useProduct(title);
  useEffect(() => {
    getAllProducts.refetch();
  }, [title]);

  const handleAddOrUpdate = () => {
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("category", productCategory);
    formData.append("description", productDescription);
    formData.append("price", String(productPrice));
    formData.append("discount", String(productDiscount));
    formData.append("stock", String(inStock));

    if (file) {
      formData.append("image", file);
    }

    if (status === "add") {
      addProduct.mutate(formData, {
        onSuccess: () => {
          resetForm();
        },
      });
    } else if (status === "update" && editingProd?._id) {
      formData.append("id", editingProd._id);
      updateProduct.mutate(formData, {
        onSuccess: () => resetForm(),
      });
    }
  };

  const resetForm = () => {
    setProductName("");
    setProductCategory("");
    setProductDescription("");
    setProductPrice(null);
    setProductDiscount(null);
    setInStock(null);
    setFile(null);
    setProdImage(null);
    setEditingProd(null);
    setStatus(null);
  };

  const { products, dashboardStats } = useDashboard();

  const filteredProducts =
    selected === "all categories"
      ? products
      : products.filter((ele) => ele.category === selected);
  return (
    <div className="bg-[#f7f7f5] p-6 flex flex-col space-y-8 w-full">
      <div className="flex flex-col md:flex-row gap-5 justify-between md:items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold capitalize">Products</h1>
          <p className="text-gray-600 capitalize">
            manage your product catalog
          </p>
        </div>
        <button
          onClick={() => setStatus("add")}
          className="px-6 py-2 bg-primary flex items-center justify-center gap-2 capitalize font-medium cursor-pointer text-white rounded-md"
        >
          <p>+</p>
          <p>add product</p>
        </button>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="w-full md:w-80 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total revenue</h1>
            <p className="text-primary font-semibold text-xl">$</p>
          </div>
          <h1 className="text-2xl font-bold">$1000</h1>
        </div>
        <div className="w-full md:w-80 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">total products</h1>
            <MdProductionQuantityLimits className="text-xl font-semibold text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold">{dashboardStats.totalProducts}</h1>
        </div>
        <div className="w-full md:w-80 px-4 py-6 flex flex-col space-y-4 border border-gray-300 shadow-sm rounded-md bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-600 capitalize">low stock</h1>
            <IoWarningOutline className="text-xl font-semibold text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold">{dashboardStats.lowStock}</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:items-center gap-4 md:gap-8 px-6 py-4 rounded-md bg-white border border-gray-300 shadow-sm">
        <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-11 rounded-full overflow-hidden max-w-190 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#6B7280"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            type="text"
            placeholder="Search product..."
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-full outline-none text-sm text-gray-500"
          />
        </div>
        <div className="flex flex-col w-44 text-sm relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left px-4 pr-2 py-2 border h-11 bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer rounded-full"
          >
            <span className="capitalize">{selected}</span>
            <svg
              className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-50">
              {categories.map((ele) => (
                <li
                  key={ele}
                  className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer capitalize"
                  onClick={() => handleSelect(ele)}
                >
                  {ele}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        <div className="w-full overflow-x-auto rounded-md bg-white border border-gray-200 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="hidden md:table-header-group text-gray-700 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {filteredProducts.map((prod) => (
                <tr className="border-t border-t-gray-300 hover:bg-[#f7f7f5] transition">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt="Product"
                      className="w-14 h-14 object-cover rounded hidden md:block"
                    />

                    <div className="flex flex-col gap-2">
                      <span className="font-medium">{prod.productName}</span>

                      <span className="md:hidden text-xs font-semibold capitalize px-3 py-1 bg-gray-200 rounded-full w-fit">
                        {prod.category}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="px-2 py-1 bg-gray-200 rounded-full">
                      {prod.category}
                    </span>
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell font-semibold">
                    ${prod.price}
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`px-2 py-1 text-white rounded-full ${prod.stock > 10 ? "bg-primary" : "bg-red-500"}`}
                    >
                      {prod.stock}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 md:gap-4 justify-center text-lg">
                      <button
                        className="p-2 hover:bg-gray-200 rounded-full transition cursor-pointer"
                        onClick={() => {
                          setStatus("update");
                          setEditingProd(prod);
                          setProductName(prod.productName);
                          setProductCategory(prod.category);
                          setProductDescription(prod.description);
                          setProductPrice(prod.price);
                          setProductDiscount(prod.discount);
                          setInStock(prod.stock);
                          setProdImage(prod.image);
                        }}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="p-2 hover:bg-red-100 rounded-full transition cursor-pointer"
                        onClick={() => deleteProduct.mutate(prod._id)}
                      >
                        <FaRegTrashAlt className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {status && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="bg-white px-6 py-8 rounded-md w-110 h-120 overflow-y-scroll">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold capitalize">{`${status} product`}</h2>
                  <button
                    className="text-2xl font-light cursor-pointer hover:text-red-500 hover:bg-red-100 p-1 rounded-full"
                    onClick={() => setStatus(null)}
                  >
                    <IoClose />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-medium">Product Name</label>
                    <input
                      type="text"
                      className="border p-2 rounded outline-primary border-gray-300 shadow-md"
                      placeholder="Product name"
                      onChange={(e) => setProductName(e.target.value)}
                      value={productName}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-medium">Product category</label>
                    <input
                      type="text"
                      className="border p-2 rounded outline-primary border-gray-300 shadow-md"
                      placeholder="Product category"
                      onChange={(e) => setProductCategory(e.target.value)}
                      value={productCategory}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-medium">Product description</label>
                    <textarea
                      name=""
                      id=""
                      placeholder="Product description"
                      className="p-2 outline-primary border-gray-300 rounded-md shadow-md"
                      onChange={(e) => setProductDescription(e.target.value)}
                      value={productDescription}
                      required
                    ></textarea>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium capitalize">
                        Product price
                      </label>
                      <input
                        type="number"
                        placeholder="Product price"
                        className="outline-primary p-2 rounded-md border border-gray-300 shadow-md w-40"
                        onChange={(e) =>
                          setProductPrice(Number(e.target.value))
                        }
                        value={productPrice ?? ""}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium capitalize">Discount</label>
                      <input
                        type="number"
                        placeholder="In stock"
                        className="outline-primary p-2 rounded-md border border-gray-300 shadow-md w-40"
                        onChange={(e) =>
                          setProductDiscount(Number(e.target.value))
                        }
                        value={productDiscount ?? ""}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium capitalize">In stock</label>
                      <input
                        type="number"
                        required
                        placeholder="In stock"
                        className="outline-primary p-2 rounded-md border border-gray-300 shadow-md w-40"
                        onChange={(e) => setInStock(Number(e.target.value))}
                        value={inStock ?? ""}
                      />
                    </div>
                  </div>
                  <label className="bg-primary hover:bg-primary/90 p-2 rounded-md cursor-pointer text-white flex items-center gap-2 justify-center">
                    <FaCamera />
                    <p>add image</p>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          setFile(selectedFile);
                          setProdImage(URL.createObjectURL(selectedFile));
                        }
                      }}
                    />
                  </label>
                  {prodImage && (
                    <img
                      src={prodImage}
                      className="w-32 h-32 object-cover rounded"
                    />
                  )}
                  <div className="flex gap-2 items-center justify-end mt-6">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
                      onClick={() => setStatus(null)}
                    >
                      Cancel
                    </button>

                    <button
                      className="bg-primary hover:bg-primary/90 cursor-pointer text-white px-4 py-2 rounded"
                      onClick={handleAddOrUpdate}
                      disabled={addProduct.isPending}
                    >
                      {addProduct.isPending ? "saving..." : "save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
