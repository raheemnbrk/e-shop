import { QueryProvider } from "@/providers/queryProviders";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ThemeInitializer from "@/components/features/layout/themeInitializer";
import AuthInitializer from "@/components/features/layout/authInitializer";
import AppShell from "@/components/features/layout/appShell";

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
      <body className={`${inter.className} bg-background text-foreground`}>
        <QueryProvider>
          <Toaster position="top-right" richColors expand={false} />
          <ThemeInitializer />
          <AuthInitializer />
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}
