"use client"

import { TableWrapper } from "@/components/features/dashboard/tableWrapper";
import { useGetAllSellers } from "@/lib/hooks/admin/sellers/useGetAllSellers";
import { SellerUser } from "@/types/adminTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
        // {
        //     key: "actions",
        //     label: "Actions",
        //     className: "text-right",
        //     render: (user: User) => (
        //         <DropdownMenu>
        //             <DropdownMenuTrigger asChild>
        //                 <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
        //                     <MoreHorizontalIcon />
        //                     <span className="sr-only">Open menu</span>
        //                 </Button>
        //             </DropdownMenuTrigger>
        //             <DropdownMenuContent align="end" className="bg-card dark:bg-dark-card">
        //                 <Link href={`/admin/users/${user.id}`} ><DropdownMenuItem className="cursor-pointer">View profile</DropdownMenuItem></Link>
        //                 <DropdownMenuItem className="cursor-pointer">Change role</DropdownMenuItem>
        //                 <DropdownMenuSeparator />
        //                 <DropdownMenuItem
        //                     className="cursor-pointer"
        //                     variant="destructive"
        //                     onSelect={(e) => e.preventDefault()}
        //                 >
        //                     <ConfirmationDialog
        //                         title="Delete user?"
        //                         description="This will permanently delete this user from your platform. This action cannot be undone."
        //                         actionText="Delete address"
        //                         onConfirm={() => deleteUser(user.id)}
        //                         trigger={
        //                             <button
        //                                 type="button"
        //                                 disabled={isPending}
        //                                 aria-label="Delete user"
        //                                 className="cursor-pointer"
        //                             >
        //                                 Delete User
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
