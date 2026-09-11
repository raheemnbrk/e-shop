"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/features/layout/footer";
import Navbar from "@/components/features/layout/navBar";

export default function ({ children }: Children) {
  const pathname = usePathname();

  const isDashboard =
    pathname.startsWith("/admin") || pathname.startsWith("/seller");

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-dark-background">
      {!isDashboard && <Navbar />}
      <div className="flex-1 px-4 md:px-8 py-4">{children}</div>
      {!isDashboard && <Footer />}
    </div>
  );
}