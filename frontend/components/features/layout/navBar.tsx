"use client";

import Link from "next/link";
import { Bell, Menu, Moon, ShoppingBag, ShoppingCart, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { DropdownMenuProfile } from "./dropDownNavbar";
import { useThemeStore } from "@/lib/store/themeStore";
import { useState } from "react";
import MobileMenu from "./mobileMenu";
import { useCartCount } from "@/lib/hooks/cart/useCartCount";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathName = usePathname();
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const [isOpen, setIsOpen] = useState(false);

  const { count } = useCartCount();

  return (
    <>
      <header className="border-b border-border bg-card dark:border-dark-border dark:bg-dark-card">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-text dark:text-dark-text">
              e-shop
            </span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base transition-colors ${pathName === link.href
                  ? "font-semibold text-primary"
                  : "text-text-secondary hover:text-primary dark:text-dark-text-secondary dark:hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={toggleTheme}
              className="cursor-pointer text-text-secondary transition hover:text-primary dark:text-dark-text-secondary dark:hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <button
              className="relative cursor-pointer text-text-secondary transition hover:text-primary dark:text-dark-text-secondary dark:hover:text-primary"
              aria-label="Notifications"
            >
              <Bell size={22} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                3
              </span>
            </button>
            <Link href={"/cart"}>
              <button
                className="relative cursor-pointer text-text-secondary transition hover:text-primary dark:text-dark-text-secondary dark:hover:text-primary mt-2"
                aria-label="Cart"
              >
                <ShoppingCart size={22} />
                {count > 0 && (<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {count > 99 ? "99+" : count}
                </span>)}
              </button>
            </Link>

            {user ? (
              <DropdownMenuProfile user={user} />
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primaryHover"
              >
                Login
              </Link>
            )}
            <button
              className="relative cursor-pointer text-text-secondary transition hover:text-primary dark:text-dark-text-secondary dark:hover:text-primary md:hidden"
              aria-label="mobile menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        user={user}
        navLinks={navLinks}
      />
    </>
  );
}
