"use client"

import { DateFilters } from "@/components/features/dashboard/dateFilter";
import { TableWrapper } from "@/components/features/dashboard/tableWrapper";
import { ConfirmationDialog } from "@/components/features/layout/confirmationButton";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCancelOrder } from "@/lib/hooks/admin/orders/useCancelOrder";
import { useGetAllOrders } from "@/lib/hooks/admin/orders/useGetAllOrders";
import { Order } from "@/types/orderTypes";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
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
        PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        PROCESSING: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        SHIPPED: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
        DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    } as const;

    const StatusBadge = ({ status }: { status: keyof typeof statusColors }) => {
        const colorClass = statusColors[status] || "bg-gray-100 text-gray-800";

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                {status}
            </span>
        );
    };

    const { cancelOrder, cancelling } = useCancelOrder()

    const columns = [
        {
            key: "orderNumber",
            label: "Order number",
        },
        {
            key: "user",
            label: "User",
            render: (order: Order) => {
                return (
                    <div className="flex items-center gap-2">
                        {order?.user?.image ? (
                            <img
                                className="h-7 w-7 rounded-full object-cover"
                                src={order.user.image}
                                alt={`${order.user.firstName} ${order.user.lastName}`}
                            />
                        ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/10 bg-blue-200 text-xs font-semibold text-primary">
                                {order?.user?.firstName?.charAt(0).toUpperCase()}
                                {order?.user?.lastName?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div className="flex gap-1">
                            <span>{order?.user?.firstName ?? "Unknown"}</span>
                            <span>{order?.user?.lastName ?? ""}</span>
                        </div>
                    </div>
                )
            },
        },
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
                    ${order.discount}
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

        {
            key: "actions",
            label: "Actions",
            className: "text-right",

            render: (order: Order) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                            <MoreHorizontalIcon />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="bg-card dark:bg-dark-card w-40">
                        <DropdownMenuItem className="cursor-pointer data-highlighted:bg-primary data-highlighted:text-white">
                            <Link href={`${order.orderNumber}`} >View Order</Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="cursor-pointer"
                            variant="destructive"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <ConfirmationDialog
                                title="Cancel order?"
                                description="This action will permanently cancel the order. Once cancelled, it cannot be recovered."
                                actionText="Cancel order"
                                onConfirm={() => cancelOrder(order.id)}
                                trigger={
                                    <button
                                        type="button"
                                        disabled={cancelling || order.status === "CANCELLED"}
                                        aria-label="Cancel order"
                                        className="w-full cursor-pointer text-left"
                                    >
                                        Cancel order
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
