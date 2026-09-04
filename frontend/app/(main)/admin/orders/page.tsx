"use client"

import { DateFilters } from "@/components/features/dashboard/dateFilter";
import { TableWrapper } from "@/components/features/dashboard/tableWrapper";
import { useGetAllOrders } from "@/lib/hooks/admin/orders/useGetAllOrders";
import { Order } from "@/types/orderTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AdminOrdersPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    const page = Number(searchParams.get("page") ?? 1)

    const search = searchParams.get("search") ?? ""

    const statusParams = searchParams.get("status") ?? ""
    const sortByParams = searchParams.get("sortBy") ?? ""
    const paymentMethodParams = searchParams.get("paymentMethod") ?? ""
    const paymentStatusParams = searchParams.get("paymentStatus") ?? ""
    const from = searchParams.get("from") ?? ""
    const to = searchParams.get("to") ?? ""

    const status = ["PENDING",
        "PROCESSING",
        "DELIVERED",
        "CANCELLED",
        "SHIPPED",
        "CONFIRMED",].includes(statusParams)
        ? (statusParams as "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED" | "SHIPPED" | "CONFIRMED")
        : undefined
    const paymentMethod = ["cash", "online"].includes(paymentMethodParams)
        ? (paymentMethodParams as "cash" | "online")
        : undefined

    const paymentStatus = ["PAID", "UNPAID"].includes(paymentStatusParams)
        ? (paymentStatusParams as "PAID" | "UNPAID")
        : undefined
    const sortBy = ["oldest", "highest", "lowest"].includes(sortByParams)
        ? (sortByParams as "oldest" | "highest" | "lowest")
        : undefined

    const { data, isLoading } = useGetAllOrders({ status, page, from, to, paymentMethod, paymentStatus, search, sortBy })

    const statusItems = [{ value: "all", label: "Status" }, { value: "PENDING", label: "pending" }, { value: "PROCESSING", label: "Processing" }, { value: "CONFIRMED", label: "Confirmed" }, { value: "SHIPPED", label: "Shipped" }, { value: "DELIVERED", label: "Delivered" }, { value: "CANCELLED", label: "Cancelled" }]
    const paymentMethodItems = [{ value: "all", label: "Payment method" }, { value: "cash", label: "Cash" }, { value: "online", label: "Online" }]
    const paymentStatusItems = [{ value: "all", label: "Payment status" }, { value: "PAID", label: "Paid" }, { value: "UNPAID", label: "Unpaid" }]
    const sortByItems = [{ value: "all", label: "SortBy" }, { value: "oldest", label: "Oldest" }, { value: "highest", label: "Highest Total" }, { value: "lowest", label: "Lowest Total" }]

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("page", String(newPage))

        router.push(`${pathName}?${params.toString()}`)
    }

    const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        PROCESSING: "bg-blue-100 text-blue-800",
        DELIVERED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800",
        SHIPPED: "bg-purple-100 text-purple-800",
        CONFIRMED: "bg-teal-100 text-teal-800",
    } as const;

    const StatusBadge = ({ status }: { status: keyof typeof statusColors }) => {
        const colorClass = statusColors[status] || "bg-gray-100 text-gray-800";

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                {status}
            </span>
        );
    };

    const columns = [
        {
            key: "orderNumber",
            label: "Order number",
        },
        {
            key: "user",
            label: "User",
            render: (order: Order) => {
                const user = Array.isArray(order.user) ? order.user[0] : order.user

                return (
                    <div className="flex items-center gap-2">
                        {user?.image ? (<img
                            className="w-6 h-6 rounded-full"
                            src={user.image}
                            alt={user?.firstName ?? "User"}
                        />) : (<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-200 text-sm font-semibold text-primary border border-primary/10">
                            {user.firstName?.[0]?.toUpperCase()}
                            {user.lastName?.[0]?.toUpperCase()}
                        </div>)}
                        <div className="flex gap-1" >
                            <span>{user?.firstName ?? "Unknown user"}</span>
                            <span>{user?.lastName ?? "Unknown user"}</span>
                        </div>
                    </div>
                )
            },
        },

        // {
        //     key: "name",
        //     label: "Name",
        //     render: (product: Order) => (
        //         <span className="font-medium">
        //             {product?.name}
        //         </span>
        //     ),
        // },
        {
            key: "status",
            label: "Status",
            render: (product: Order) => (
                <StatusBadge status={product.status as keyof typeof statusColors} />
            ),
        },

        {
            key: "total",
            label: "Total",
            render: (order: Order) => (
                <span className="font-medium">
                    ${order.total}
                </span>
            ),
        },

        {
            key: "discount",
            label: "Discount",
            render: (order: Order) => (
                <span className="font-medium">
                    {order.discount}%
                </span>
            ),
        },

        {
            key: "shipping cost",
            label: "Shipping Cost",
            render: (order: Order) => (
                <span>${order.shippingCost}</span>
            )
        },
        {
            key: "delivery method",
            label: "DeliveryMethod",
            render: (order: Order) => (
                <span className="capitalize" >{order.deliveryMethod.toLowerCase()}</span>
            )
        },
        {
            key: "items",
            label: "Items",
            render: (order: Order) => (
                <span className="font-medium">
                    {order.items?.length ?? 0}
                </span>
            ),
        },

        {
            key: "payment method",
            label: "Payment Method",
            render: (order: Order) =>
                <span className="capitalize" >{order.paymentMethod.toLowerCase()}</span>,
        },
        {
            key: "payment status",
            label: "Payment Status",
            render: (order: Order) =>
                <span className={`${order.paymentStatus === "PAID" ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"} rounded-full px-2 py-1 capitalize`} >{order.paymentStatus.toLowerCase()}</span>,
        },
        {
            key: "coupon",
            label: "Coupon",
            render: (order: Order) =>
                <span className={`${order.coupon ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"} rounded-full px-2 py-1 capitalize`} >{order.coupon ? "applied" : "not applied"}</span>,
        },
        {
            key: "createdAt",
            label: "Created at",
            render: (product: Order) =>
                new Date(product.createdAt).toLocaleDateString(),
        },

        // {
        //     key: "actions",
        //     label: "Actions",
        //     className: "text-right",

        //     render: (product: Product) => (
        //         <DropdownMenu>
        //             <DropdownMenuTrigger asChild>
        //                 <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
        //                     <MoreHorizontalIcon />
        //                     <span className="sr-only">Open menu</span>
        //                 </Button>
        //             </DropdownMenuTrigger>

        //             <DropdownMenuContent align="end" className="bg-card dark:bg-dark-card w-40">
        //                 <DropdownMenuItem className="cursor-pointer data-highlighted:bg-primary data-highlighted:text-white">
        //                     <Link href={`/products/${product.slug}`} >View product</Link>
        //                 </DropdownMenuItem>

        //                 <DropdownMenuItem
        //                     className="cursor-pointer data-highlighted:bg-primary data-highlighted:text-white"

        //                 >
        //                     <Link href={`/sellers/${product.seller.storeSlug}`} >View seller</Link>
        //                 </DropdownMenuItem>


        //                 <DropdownMenuSeparator />

        //                 <DropdownMenuItem
        //                     className="cursor-pointer"
        //                     variant="destructive"
        //                     onSelect={(e) => e.preventDefault()}
        //                 >
        //                     <ConfirmationDialog
        //                         title="Delete product?"
        //                         description="This will permanently delete this product from your store. This action cannot be undone."
        //                         actionText="Delete product"
        //                         onConfirm={() => deleteProduct(product.id)}
        //                         trigger={
        //                             <button
        //                                 type="button"
        //                                 disabled={deleting}
        //                                 aria-label="Delete product"
        //                                 className="w-full cursor-pointer text-left"
        //                             >
        //                                 Delete product
        //                             </button>
        //                         }
        //                     />
        //                 </DropdownMenuItem>
        //             </DropdownMenuContent>
        //         </DropdownMenu>
        //     ),
        // },
    ]

    return (
        <div className="flex flex-col space-y-4" >
            <div>
                <h1 className="text-2xl font-bold text-text dark:text-dark-text">Orders</h1>
                <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
                    Manage all orders across the platform.
                </p>

            </div>

            <DateFilters />

            <TableWrapper
                columns={columns}
                data={data?.orders ?? []}
                isLoading={isLoading}
                pagination={data?.pagination}
                onPageChange={handlePageChange}
                searchPlaceholder="Search by user name or order number...."
                selects={[
                    {
                        param: "status",
                        items: statusItems,
                        label: "status",
                    },
                    {
                        param: "paymentMethod",
                        items: paymentMethodItems,
                        label: "Payment Method",
                    },
                    {
                        param: "paymentStatus",
                        items: paymentStatusItems,
                        label: "Payment Status",
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
