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
import { User } from "@/types/authTypes";

export function DropdownMenuProfile({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold uppercase text-primary cursor-pointer">
          {user?.lastName[0]}
          {user?.firstName[0]}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 mt-2 bg-card dark:bg-dark-card border-border dark:border-dark-border">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-text-secondary dark:text-dark-text-secondary">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer text-text dark:text-dark-text hover:text-primary">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-text dark:text-dark-text hover:text-primary">
            My orders
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-border dark:bg-dark-border" />
        <DropdownMenuItem className="cursor-pointer text-red-600">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
