"use client"

import { TableWrapper } from "@/components/features/dashboard/tableWrapper";
import { useGetSellerCustomers } from "@/lib/hooks/seller/useGetSellerCustomers";
import { SellerCustomer } from "@/types/sellerTypes";
import { Eye } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Customers() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    const page = Number(searchParams.get("page") ?? 1)

    const search = searchParams.get("search") ?? ""

    const sortByParams = searchParams.get("sortBy") ?? ""
    const customerTypeParams = searchParams.get("customerType") ?? ""


    const customerType = ["new", "returning"].includes(customerTypeParams)
        ? (customerTypeParams as "new" | "returning")
        : "all"

    const sortBy = ["highest_spending", "most_orders", "latest_order", "newest"].includes(sortByParams)
        ? (sortByParams as "highest_spending", "most_orders", "latest_order")
        : "newest"

    const { data, isLoading } = useGetSellerCustomers({ page, search, customerType, sortBy })


    const customerTypeItems = [{ value: "all", label: "Customer type" }, { value: "new", label: "New" }, { value: "returning", label: "Returning" }]
    const sortByItems = [{ value: "all", label: "SortBy" }, { value: "oldest", label: "Oldest" }, { value: "highest", label: "Highest Total" }, { value: "lowest", label: "Lowest Total" }]

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("page", String(newPage))

        router.push(`${pathName}?${params.toString()}`)
    }

    const columns = [
        {
            key: "Customer",
            label: "Customer",
            render: (customer: SellerCustomer) => {
                return (
                    <div className="flex items-center gap-2">
                        {customer?.image ? (
                            <img
                                className="h-7 w-7 rounded-full object-cover"
                                src={customer.image}
                                alt={`${customer.firstName} ${customer.lastName}`}
                            />
                        ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/10 bg-blue-200 text-xs font-semibold text-primary">
                                {customer?.firstName?.charAt(0).toUpperCase()}
                                {customer?.lastName?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div className="flex gap-1">
                            <span>{customer?.firstName ?? "Unknown"}</span>
                            <span>{customer?.lastName ?? ""}</span>
                        </div>
                    </div>
                )
            },
        },

        {
            key: "email",
            label: "Email",
        },

        {
            key: "orders",
            label: "Orders",

        },

        {
            key: "totalSpent",
            label: "Total Spent",
            render: (customer: SellerCustomer) => (
                <span>${customer.totalSpent}</span>
            )
        },
        {
            key: "last order",
            label: "Last Order",
            render: (customer: SellerCustomer) =>
                new Date(customer.lastOrder).toLocaleDateString(),
        },

        {
            key: "actions",
            label: "Actions",
            className: "text-right",

            render: (customer: SellerCustomer) => (
                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            `/seller//${customer.userId}`
                        )
                    }
                    className="cursor-pointer rounded-md p-2 text-text-secondary transition hover:bg-muted hover:text-text dark:text-dark-text-secondary dark:hover:bg-dark-muted dark:hover:text-dark-text"
                    title="View order"
                >
                    <Eye size={18} />
                </button>
            ),
        },
    ]

    return (
        <div className="flex flex-col space-y-4" >
            <div>
                <h1 className="text-2xl font-bold text-text dark:text-dark-text">Customers</h1>
                <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
                    Manage all customers across the platform.
                </p>

            </div>

            <TableWrapper<SellerCustomer & { id: string }>
                columns={columns}
                data={(data?.customers ?? []).map((customer) => ({
                    ...customer,
                    id: customer.userId,
                }))}
                isLoading={isLoading}
                pagination={data?.pagination}
                onPageChange={handlePageChange}
                searchPlaceholder="Search by user name or email...."
                selects={[
                    {
                        param: "customer type",
                        items: customerTypeItems,
                        label: "Customer type",
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
