"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { User } from "@/types/authTypes";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  navLinks: { name: string; href: string }[];
}

export default function MobileMenu({
  open,
  onClose,
  user,
  navLinks,
}: MobileMenuProps) {
  const pathName = usePathname();

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "visible bg-black/40" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute right-0 top-0 h-full w-72 bg-card dark:bg-dark-card border-l border-border dark:border-dark-border transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border dark:border-dark-border p-5">
          <h2 className="text-lg font-semibold text-text dark:text-dark-text">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathName === link.href
                  ? "bg-blue-50 font-semibold text-primary dark:bg-blue-950"
                  : "text-text-secondary hover:bg-background hover:text-text dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="my-3 border-t border-border dark:border-dark-border" />

          {!user && (
            <Link
              href="/login"
              onClick={onClose}
              className="mt-2 rounded-full bg-primary py-3 text-center text-sm font-semibold text-white transition hover:bg-primaryHover"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
