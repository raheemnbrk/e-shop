import toast from "react-hot-toast";
import { useAuthUser } from "../zustand/authUser";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function AdminRoute() {
  const { user, loading } = useAuthUser();
  useEffect(() => {
    if (user && user.role !== "admin") {
      toast.error("Only admin can access this page.");
    }
  }, [user]);

  if (loading) return <p>loading....</p>;
  if (!user) return <Navigate to={"/login"} replace />;
  if (user.role !== "admin") return <Navigate to={"/"} replace />;
  return <Outlet />;
}
