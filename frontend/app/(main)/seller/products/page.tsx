"use client"

import { useState } from "react";
import { TableWrapper } from "@/components/features/dashboard/tableWrapper";
import { ConfirmationDialog } from "@/components/features/layout/confirmationButton";
import { ProductDialog } from "@/components/features/products/addProductDialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetCategories } from "@/lib/hooks/categories/useGetCategories";
import { useGetALlProducts } from "@/lib/hooks/seller/useGetAllProducts";
import { Category } from "@/types/categoryTypes";
import { Product } from "@/types/productTypes";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToggleProductAvailability } from "@/lib/hooks/seller/useToggleProduct";
import { useDeleteProduct } from "@/lib/hooks/seller/useDeleteProduct";
import Link from "next/link";

export default function Products() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    const page = Number(searchParams.get("page") ?? 1)

    const search = searchParams.get("search") ?? ""

    const category = searchParams.get("category") ?? ""
    const statusParams = searchParams.get("status") ?? ""
    const stockParams = searchParams.get("stock") ?? ""
    const sortByParams = searchParams.get("sortBy") ?? ""

    const status = ["available", "not available"].includes(statusParams) ? (statusParams as "available" | "not available") : undefined
    const stock = ["in", "out", "low", "all"].includes(stockParams)
        ? (stockParams as "in" | "out" | "low" | "all")
        : undefined
    const sortBy = ["high", "low", "newest", "oldest", "top"].includes(sortByParams)
        ? (sortByParams as "low" | "all" | "high" | "newest" | "oldest" | "top")
        : undefined

    const { data, isLoading } = useGetALlProducts({ page, search, category, status, stock, sortBy })
    const { data: categories } = useGetCategories()
    console.log(data?.products)

    const statusItems = [{ value: "all", label: "All status" }, { value: "available", label: "Available" }, { value: "not available", label: "Not available" }]
    const categoryItems = [
        { value: "all", label: "All" },
        ...(categories?.map((category: Category) => ({
            value: category.slug,
            label: category.name,
        })) ?? []),
    ];
    const stockItems = [{ value: "all", label: "Stock" }, { value: "in", label: "In stock" }, { value: "out", label: "Out of stock" }, { value: "low", label: "Low stock" }]
    const sortByItems = [{ value: "all", label: "Sort By" }, { value: "high", label: "Higher price" }, { value: "low", label: "Lower price" }, { value: "newest", label: "Newest" }, { value: "oldest", label: "oldest" }, { value: "top selling", label: "Top selling" }]

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("page", String(newPage))

        router.push(`${pathName}?${params.toString()}`)
    }

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const { toggleProductAvailability, toggling } = useToggleProductAvailability()
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
            render: (product: Product) => (
                <span className="font-medium">
                    ${product.price - ((product.price * (product.discount) / 100))}
                </span>
            ),
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
                            onSelect={(e) => e.preventDefault()}
                            onClick={() => {
                                setSelectedProduct(product)
                                setDialogOpen(true)
                            }}
                        >
                            Edit product
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="cursor-pointer data-highlighted:bg-primary data-highlighted:text-white"
                            onSelect={(e) => e.preventDefault()}
                            onClick={() => toggleProductAvailability(product.id)}
                            disabled={toggling}
                        >
                            {product.available ? "Mark as unavailable" : "Mark as available"}
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
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-text dark:text-dark-text md:text-2xl">
                        Products
                    </h1>
                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                        Manage all products across the platform
                    </p>
                </div>
                <button
                    onClick={() => setDialogOpen(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primaryHover"
                >
                    <PlusIcon className="h-4 w-4" />
                    Add Product
                </button>
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
                        param: "category",
                        items: categoryItems,
                        label: "Category",
                    },
                    {
                        param: "status",
                        items: statusItems,
                        label: "status",
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

            <ProductDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                product={selectedProduct}
            />
        </div>
    )
}