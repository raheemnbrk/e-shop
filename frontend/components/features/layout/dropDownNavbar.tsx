"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/lib/hooks/auth/useLogout";
import { User } from "@/types/authTypes";
import Link from "next/link";

export function DropdownMenuProfile({ user }: { user: User }) {
  const { handleLogout } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold uppercase text-primary cursor-pointer">
          {user && user.image ? (
            <img src={user.image} className="h-full w-full object-cover rounded-full" alt="avatar" />
          ) : (
            <>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 mt-2 bg-card dark:bg-dark-card border-border dark:border-dark-border">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-text-secondary dark:text-dark-text-secondary">
            My Account
          </DropdownMenuLabel>
          <Link href={"/my-profile"} >
            <DropdownMenuItem className="cursor-pointer text-text dark:text-dark-text data-highlighted:bg-primary data-highlighted:text-white">
              Profile
            </DropdownMenuItem>
          </Link>
          {user.role !== "CUSTOMER" && (<Link href={user.role === "ADMIN" ? "admin" : "seller"} >
            <DropdownMenuItem className="cursor-pointer text-text dark:text-dark-text data-highlighted:bg-primary data-highlighted:text-white">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
            </DropdownMenuItem>
          </Link>)}
          <DropdownMenuItem className="cursor-pointer text-text dark:text-dark-text data-highlighted:bg-primary data-highlighted:text-white">
            My orders
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-border dark:bg-dark-border" />
        <DropdownMenuItem
          className="cursor-pointer text-red-700 data-highlighted:bg-red-300 data-highlighted:text-red-700"
          onClick={handleLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
