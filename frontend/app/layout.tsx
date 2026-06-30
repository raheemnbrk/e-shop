import { QueryProvider } from "@/providers/queryProviders";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "e-shop",
  description:
    "Discover premium electronics, fashion, home essentials, and more at unbeatable prices.",
  icons: "/logo.svg",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Toaster position="top-right" richColors />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
