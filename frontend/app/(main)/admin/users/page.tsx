"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { TableWrapper } from "@/components/features/dashboard/tableWrapper"
import { MoreHorizontalIcon, ShieldIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGetAllUsers } from "@/lib/hooks/admin/users/useGetAllUsers"
import { User } from "@/types/authTypes"
import Link from "next/link"
import { ConfirmationDialog } from "@/components/features/layout/confirmationButton"
import { useDeleteUser } from "@/lib/hooks/admin/users/useDeleteUser"
import { useChangeRole } from "@/lib/hooks/admin/users/useChangeRole"

const roleItems = [
    { value: "ALL", label: "All roles" },
    { value: "CUSTOMER", label: "Customer" },
    { value: "SELLER", label: "Seller" },
    { value: "ADMIN", label: "Admin" },
]

export default function UsersPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const page = Number(searchParams.get("page") ?? 1)
    const search = searchParams.get("search") ?? ""

    const roleParam = searchParams.get("filter")

    const role = ["ADMIN", "CUSTOMER", "SELLER"].includes(
        roleParam ?? ""
    )
        ? (roleParam as "ADMIN" | "CUSTOMER" | "SELLER")
        : undefined

    const { data, isLoading } = useGetAllUsers({
        role,
        search,
        page,
    })

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("page", String(newPage))

        router.push(`${pathname}?${params.toString()}`)
    }

    const { deleteUser, isPending } = useDeleteUser()

    const { changeRole, isPending: changing } = useChangeRole()

    const columns = [
        {
            key: "image",
            label: "Image",
            render: (user: User) => (
                user.image ? (
                    <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-sm font-semibold text-primary border border-primary/10">
                        {user.firstName?.[0]?.toUpperCase()}
                        {user.lastName?.[0]?.toUpperCase()}
                    </div>
                )
            ),
        },

        {
            key: "name",
            label: "Name",
            render: (user: User) => (
                <span className="font-medium">
                    {user.firstName} {user.lastName}
                </span>
            ),
        },

        {
            key: "email",
            label: "Email",
        },

        {
            key: "phone",
            label: "Phone",
            render: (user: User) => (
                <span className="font-medium">
                    {user.phoneNumber ?? "_"}
                </span>
            ),
        },

        {
            key: "role",
            label: "Role",
            render: (user: User) => (
                <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "SELLER"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                >
                    {user.role}
                </span>
            ),
        },

        {
            key: "isVerified",
            label: "Verified",
            render: (user: User) => (
                <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${user.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {user.isVerified ? "Verified" : "Unverified"}
                </span>
            ),
        },

        {
            key: "createdAt",
            label: "Joined",
            render: (user: User) =>
                new Date(user.createdAt).toLocaleDateString(),
        },

        {
            key: "actions",
            label: "Actions",
            className: "text-right",

            render: (user: User) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 cursor-pointer"
                        >
                            <MoreHorizontalIcon />
                            <span className="sr-only">
                                Open menu
                            </span>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="bg-card dark:bg-dark-card"
                    >
                        <Link href={`/admin/users/${user.id}`}>
                            <DropdownMenuItem className="cursor-pointer data-highlighted:bg-primary">
                                View profile
                            </DropdownMenuItem>
                        </Link>

                        {user.role === "CUSTOMER" && (
                            <DropdownMenuItem
                                className="cursor-pointer data-highlighted:bg-primary"
                                onSelect={(e) => e.preventDefault()}
                                onClick={() => changeRole({ id: user?.id, role: "ADMIN" })}
                            >
                                Make Admin
                            </DropdownMenuItem>
                        )}

                        {user.role === "ADMIN" && (
                            <DropdownMenuItem
                                className="cursor-pointer data-highlighted:bg-primary"
                                onSelect={(e) => e.preventDefault()}
                                onClick={() => changeRole({ id: user?.id, role: "CUSTOMER" })}
                            >
                                Revoke Admin
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="cursor-pointer"
                            variant="destructive"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <ConfirmationDialog
                                title="Delete user?"
                                description="This will permanently delete this user from your platform. This action cannot be undone."
                                actionText="Delete user"
                                onConfirm={() =>
                                    deleteUser(user.id)
                                }
                                trigger={
                                    <button
                                        type="button"
                                        disabled={isPending}
                                        aria-label="Delete user"
                                        className="cursor-pointer"
                                    >
                                        Delete User
                                    </button>
                                }
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            ),
        },
    ]

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-text dark:text-dark-text">
                    Users
                </h1>

                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                    Manage all users across the platform
                </p>
            </div>

            <TableWrapper
                columns={columns}
                data={data?.users ?? []}
                isLoading={isLoading}
                pagination={data?.pagination}
                onPageChange={handlePageChange}
                searchPlaceholder="Search by user name"
                selectItems={roleItems}
                selectLabel="All roles"
            />
        </div>
    )
}