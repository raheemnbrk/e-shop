"use client";

import { useThemeStore } from "@/lib/store/themeStore";
import { useEffect } from "react";

export default function ThemeInitializer() {
  const { theme } = useThemeStore();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return null;
}
