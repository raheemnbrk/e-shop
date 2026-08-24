"use client"

import { TableWrapper } from "@/components/features/dashboard/tableWrapper";
import CouponDialog from "@/components/features/layout/admin/addCouponDialog";
import { ConfirmationDialog } from "@/components/features/layout/confirmationButton";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetAllCoupons } from "@/lib/hooks/admin/coupons/useGetAllCoupons";
import { Coupon } from "@/types/couponTypes";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminCouponsPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    const page = Number(searchParams.get("page") ?? 1)

    const search = searchParams.get("search") ?? ""

    const statusParams = searchParams.get("status") ?? ""
    const typeParams = searchParams.get("type") ?? ""
    const sortByParams = searchParams.get("sortBy") ?? ""

    const status = ["active", "inactive"].includes(statusParams) ? (statusParams as "active" | "inactive") : undefined
    const type = ["FIXED", "PERCENTAGE"].includes(typeParams)
        ? (typeParams as "PERCENTAGE" | "FIXED")
        : undefined
    const sortBy = ["newest", "oldest", "high discount", "low discount"].includes(sortByParams)
        ? (sortByParams as "newest" | "oldest" | "high discount" | "low discount")
        : undefined

    const { data, isLoading } = useGetAllCoupons({ page, search, status, type, sortBy })

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("page", String(newPage))

        router.push(`${pathName}?${params.toString()}`)
    }

    const statusItems = [{ value: "all", label: "Status" }, { value: "active", label: "Active" }, { value: "inactive", label: "Not Active" }]
    const typeItems = [{ value: "all", label: "Type" }, { value: "PERCENTAGE", label: "Percentage" }, { value: "FIXED", label: "Fixed" }]
    const sortByItems = [{ value: "all", label: "Newest" }, { value: "oldest", label: "Oldest" }, { value: "high discount", label: "Higher Discount" }, { value: "low discount", label: "lower discount" }]

    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

    const columns = [
        {
            key: "code",
            label: "Code",
            render: (coupon: Coupon) => (
                <span className="font-medium">
                    {coupon?.code}
                </span>
            ),
        },
        {
            key: "discount",
            label: "Discount",
            render: (coupon: Coupon) => (
                <span className="font-medium">
                    {coupon?.type === "FIXED" ? `$${coupon.discount}` : `${coupon.discount}%`}
                </span>
            ),
        },

        {
            key: "maxUses",
            label: "Max Uses",
            render: (coupon: Coupon) => (
                <span className="font-medium">
                    {coupon?.maxUses}
                </span>
            ),
        },

        {
            key: "usedCount",
            label: "Used count",
            render: (coupon: Coupon) => (
                <span className="font-medium">
                    {coupon?.usedCount}
                </span>
            ),
        },


        {
            key: "isActive",
            label: "Is Active",
            render: (coupon: Coupon) => (
                <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${coupon?.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {coupon?.isActive ? "Active" : "Not Active"}
                </span>
            ),
        },

        {
            key: "createdAt",
            label: "Created At",
            render: (coupon: Coupon) =>
                new Date(coupon.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }),
        },

        {
            key: "expiresAt",
            label: "Expires At",
            render: (coupon: Coupon) =>
                new Date(coupon.expiresAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }),
        },
        {
            key: "actions",
            label: "Actions",
            className: "text-right",

            render: (coupon: Coupon) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                            <MoreHorizontalIcon />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="bg-card dark:bg-dark-card w-40">

                        <DropdownMenuItem
                            className="cursor-pointer data-highlighted:bg-primary data-highlighted:text-white"
                            onSelect={(e) => e.preventDefault()}
                            onClick={() => {
                                setSelectedCoupon(coupon)
                                setDialogOpen(true)
                            }}
                        >
                            Edit product
                        </DropdownMenuItem>

                        {/* <DropdownMenuItem
                            className="cursor-pointer data-highlighted:bg-primary data-highlighted:text-white"
                            onSelect={(e) => e.preventDefault()}
                            onClick={() => toggleProductAvailability(product.id)}
                            disabled={toggling}
                        >
                            {product.available ? "Mark as unavailable" : "Mark as available"}
                        </DropdownMenuItem> */}

                        <DropdownMenuSeparator />

                        {/* <DropdownMenuItem
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
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ]

    return (
        <div className="flex flex-col space-y-5" >
            <div className="flex items-center justify-between" >
                <div>
                    <h1 className="text-2xl font-bold text-text dark:text-dark-text">Coupons</h1>
                    <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
                        Manage all coupons across the platform
                    </p>
                </div>
                <button
                    onClick={() => {
                        setSelectedCoupon(null)
                        setDialogOpen(true)
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primaryHover"
                >
                    <PlusIcon className="h-4 w-4" />
                    Add Coupon
                </button>
            </div>

            <TableWrapper
                columns={columns}
                data={data?.coupons ?? []}
                isLoading={isLoading}
                pagination={data?.pagination}
                onPageChange={handlePageChange}
                searchPlaceholder="Search by coupon code"
                selects={[
                    {
                        param: "status",
                        items: statusItems,
                        label: "Status",
                    },
                    {
                        param: "type",
                        items: typeItems,
                        label: "Type",
                    },
                    {
                        param: "sortBy",
                        items: sortByItems,
                        label: "SortBy",
                    },
                ]}
            />
            <CouponDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                coupon={selectedCoupon}
            />
        </div>
    );
}
