import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Footer from "./components/footer";

export default function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const element = document.documentElement;
  useEffect(() => {
    localStorage.setItem("theme", theme);
    theme === "dark"
      ? element.classList.remove("dark")
      : element.classList.add("dark");
  }, [theme]);

  return (
    <div className="flex flex-col space-y-12">
      <Navbar theme={theme} setTheme={setTheme} />
      <Outlet />
      <Footer />
    </div>
  );
}
