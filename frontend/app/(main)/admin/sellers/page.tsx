"use client"

import { TableWrapper } from "@/components/features/dashboard/tableWrapper";
import { useGetAllSellers } from "@/lib/hooks/admin/sellers/useGetAllSellers";
import { SellerUser } from "@/types/adminTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckIcon, Link, MoreHorizontalIcon, XIcon } from "lucide-react";
import { ConfirmationDialog } from "@/components/features/layout/confirmationButton";
import { Button } from "@/components/ui/button";
import { useApproveSeller } from "@/lib/hooks/admin/sellers/useApproveSeller";
import { useRejectSeller } from "@/lib/hooks/admin/sellers/useRejectSeller";

const statusItems = [
    { value: "ALL", label: "All status" },
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
]

export default function AdminSellersPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    const page = Number(searchParams.get("page") ?? 1)
    const search = searchParams.get("search") ?? ""
    const statusParams = searchParams.get("filter")
    const status = ["PENDING", "APPROVED", "REJECTED"].includes(statusParams ?? "")
        ? (statusParams as "PENDING" | "APPROVED" | "REJECTED")
        : undefined


    const { data, isLoading } = useGetAllSellers({ page, search, status })

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", String(newPage))
        router.push(`${pathName}?${params.toString()}`)
    }

    const { handleApprove, isPending: Approving } = useApproveSeller()
    const { handleReject, isPending: Rejecting } = useRejectSeller()

    const columns = [
        {
            key: "logo",
            label: "Logo",
            render: (user: SellerUser) => (
                <img src={user?.Seller?.logo} className="rounded-full w-8 h-8" />
            )
        },
        {
            key: "name",
            label: "Name",
            render: (user: SellerUser) => (
                <span className="font-medium">
                    {user.firstName} {user.lastName}
                </span>
            ),
        },
        { key: "email", label: "Email" },
        {
            key: "phone", label: "Phone", render: (user: SellerUser) => (
                <span className="font-medium">
                    {user.phoneNumber ?? "_"}
                </span>)
        },
        {
            key: "status",
            label: "Status",
            render: (user: SellerUser) => (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${user?.Seller?.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : user?.Seller?.status === "PENDING"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {user?.Seller?.status}
                </span>
            ),
        },
        {
            key: "store",
            label: "Store",
            render: (user: SellerUser) => (
                <span>{user?.Seller?.storeName}</span>
            ),
        },
        {
            key: "createdAt",
            label: "Joined",
            render: (user: SellerUser) =>
                new Date(user.createdAt).toLocaleDateString(),
        },
        {
            key: "actions",
            label: "Actions",
            className: "text-right",
            render: (user: SellerUser) => (
                <div className="flex items-center justify-end gap-2">
                    {user.Seller?.status === "PENDING" ? (
                        <>
                            <button
                                onClick={() => handleApprove(user?.id)}
                                disabled={Approving}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors text-xs font-medium cursor-pointer disabled:opacity-50"
                            >
                                <CheckIcon className="w-3.5 h-3.5" />
                                Approve
                            </button>
                            <button
                                onClick={() => handleApprove(user?.id)}
                                disabled={Rejecting}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors text-xs font-medium cursor-pointer disabled:opacity-50"
                            >
                                <XIcon className="w-3.5 h-3.5" />
                                Reject
                            </button>
                        </>
                    ) : (
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                                    <MoreHorizontalIcon />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-card dark:bg-dark-card">
                                <DropdownMenuItem className="cursor-pointer data-highlighted:bg-primary">
                                    View profile
                                </DropdownMenuItem>
                                {user.Seller?.status === "APPROVED" && (
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        variant="destructive"
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        <ConfirmationDialog
                                            title="Suspend seller?"
                                            description="This seller will no longer be able to sell on the platform."
                                            actionText="Suspend"
                                            onConfirm={() => handleReject(user?.id)}
                                            trigger={
                                                <button type="button" className="cursor-pointer w-full text-left">
                                                    Suspend
                                                </button>
                                            }
                                        />
                                    </DropdownMenuItem>
                                )}
                                {user.Seller?.status === "REJECTED" && (
                                    <DropdownMenuItem
                                        className="cursor-pointer text-green-700 data-highlighted:bg-green-50 data-highlighted:text-green-700"
                                        onClick={() => handleApprove(user?.id)}
                                    >
                                        Re-approve
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            ),
        },
    ]

    return (
        <div className="flex flex-col space-y-4">
            <div>
                <h1 className="text-2xl font-bold text-text dark:text-dark-text">Sellers</h1>
                <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
                    Manage all sellers across the platform.
                </p>
            </div>

            <TableWrapper
                isLoading={isLoading}
                data={(data?.sellers ?? []) as SellerUser[]}
                pagination={data?.pagination}
                columns={columns}
                onPageChange={handlePageChange}
                searchPlaceholder="Search by seller name or store name..."
                selectItems={statusItems}
                selectLabel="All status"
            />
        </div>
    );
}
