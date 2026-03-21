import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  const element = document.documentElement;
  useEffect(() => {
    localStorage.setItem("theme", theme);
    theme === "dark"
      ? element.classList.remove("dark")
      : element.classList.add("dark");
  }, [theme]);

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col space-y-12">
      {!isDashboard && <Navbar theme={theme} setTheme={setTheme} />}
      <Toaster />
      <Outlet />
      {!isDashboard && <Footer />}
    </div>
  );
}
