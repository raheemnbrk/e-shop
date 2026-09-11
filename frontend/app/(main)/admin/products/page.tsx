"use client"

import { TableWrapper } from "@/components/features/dashboard/tableWrapper";
import { ConfirmationDialog } from "@/components/features/layout/confirmationButton";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteProduct } from "@/lib/hooks/admin/products/useDeleteProduct";
import { useGetAllProducts } from "@/lib/hooks/admin/products/useGetAllProducts";
import { useGetCategories } from "@/lib/hooks/categories/useGetCategories";
import { Category } from "@/types/categoryTypes";
import { Product } from "@/types/productTypes";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AdminProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  const page = Number(searchParams.get("page") ?? 1)

  const search = searchParams.get("search") ?? ""

  const category = searchParams.get("category") ?? ""
  const searchByParams = searchParams.get("searchBy") ?? ""
  const stockParams = searchParams.get("stock") ?? ""
  const sortByParams = searchParams.get("sortBy") ?? ""

  const searchBy = ["product", "seller"].includes(searchByParams) ? (searchByParams as "product" | "seller") : undefined
  const stock = ["in", "out", "low", "all"].includes(stockParams)
    ? (stockParams as "in" | "out" | "low" | "all")
    : undefined
  const sortBy = ["high", "low", "oldest", "top"].includes(sortByParams)
    ? (sortByParams as "low" | "all" | "high" | "newest" | "oldest" | "top")
    : undefined

  const { data, isLoading } = useGetAllProducts({ page, search, category, sortBy, searchBy, stock })

  const { data: categories } = useGetCategories()

  const searchByItems = [{ value: "all", label: "Product" }, { value: "seller", label: "Seller" }]
  const categoryItems = [
    { value: "all", label: "All Categories" },
    ...(categories?.map((category: Category) => ({
      value: category.slug,
      label: category.name,
    })) ?? []),
  ];
  const stockItems = [{ value: "all", label: "Stock" }, { value: "in", label: "In stock" }, { value: "out", label: "Out of stock" }, { value: "low", label: "Low stock" }]
  const sortByItems = [{ value: "all", label: "Sort By" }, { value: "high", label: "Higher price" }, { value: "low", label: "Lower price" }, { value: "oldest", label: "oldest" }, { value: "top selling", label: "Top selling" }]

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("page", String(newPage))

    router.push(`${pathName}?${params.toString()}`)
  }

  const { deleteProduct, deleting } = useDeleteProduct()

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (product: Product) => (
        <img
          src={product?.images[0]}
          alt={`${product?.slug}`}
          className="w-8 h-8 rounded-full object-cover"
        />
      ),
    },

    {
      key: "name",
      label: "Name",
      render: (product: Product) => (
        <span className="font-medium">
          {product?.name}
        </span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (product: Product) => (
        <span className="font-medium">
          {product.category.name}
        </span>
      ),
    },

    {
      key: "price",
      label: "Price",
      render: (product: Product) => {
        const price = Number(product.price ?? 0);
        const discount = Number(product.discount ?? 0);

        const finalPrice = discount > 0
          ? parseFloat((price * (1 - discount / 100)).toFixed(2))  
          : price;

        return (
          <span className="font-medium">
            ${finalPrice.toFixed(2)}
          </span>
        );
      },
    },

    {
      key: "discount",
      label: "Discount",
      render: (product: Product) => (
        <span className="font-medium">
          {product.discount}%
        </span>
      ),
    },

    {
      key: "stock",
      label: "Stock",
    },

    {
      key: "available",
      label: "Is available",
      render: (product: Product) => (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${product?.available
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {product.available ? "Available" : "Not available"}
        </span>
      ),
    },
    {
      key: "store",
      label: "Store",
      render: (product: Product) => (
        <div className="flex items-center gap-3" >
          <img className="w-6 h-6 rounded-full" src={product?.seller?.logo} alt={product?.seller?.storeSlug} />
          <span>{product?.seller?.storeName}</span>
        </div>
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      render: (product: Product) => (
        <span className="font-medium">
          {product.reviews?.length ?? 0}
        </span>
      ),
    },

    {
      key: "createdAt",
      label: "Created at",
      render: (product: Product) =>
        new Date(product.createdAt).toLocaleDateString(),
    },

    {
      key: "actions",
      label: "Actions",
      className: "text-right",

      render: (product: Product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
              <MoreHorizontalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="bg-card dark:bg-dark-card w-40">
            <DropdownMenuItem className="cursor-pointer data-highlighted:bg-primary data-highlighted:text-white">
              <Link href={`/products/${product.slug}`} >View product</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer data-highlighted:bg-primary data-highlighted:text-white"

            >
              <Link href={`/admin/sellers/${product.seller.storeSlug}`} >View seller</Link>
            </DropdownMenuItem>


            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              variant="destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <ConfirmationDialog
                title="Delete product?"
                description="This will permanently delete this product from your store. This action cannot be undone."
                actionText="Delete product"
                onConfirm={() => deleteProduct(product.id)}
                trigger={
                  <button
                    type="button"
                    disabled={deleting}
                    aria-label="Delete product"
                    className="w-full cursor-pointer text-left"
                  >
                    Delete product
                  </button>
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
  return (
    <div className="flex flex-col gap-5" >
      <div>
        <h1 className="text-2xl font-bold text-text dark:text-dark-text">Products</h1>
        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
          Manage all products across the platform
        </p>
      </div>

      <TableWrapper
        columns={columns}
        data={data?.products ?? []}
        isLoading={isLoading}
        pagination={data?.pagination}
        onPageChange={handlePageChange}
        searchPlaceholder="Search by product name"
        selects={[
          {
            param: "searchBy",
            items: searchByItems,
            label: "SearchBy",
          },
          {
            param: "category",
            items: categoryItems,
            label: "Category",
          },
          {
            param: "stock",
            items: stockItems,
            label: "Stock",
          },
          {
            param: "sortBy",
            items: sortByItems,
            label: "SortBy",
          },
        ]}
      />
    </div>
  );
}
