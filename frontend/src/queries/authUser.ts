import { useMutation } from "@tanstack/react-query";
import { authUser, loginUser, logoutUser, registerUser } from "../api/userApi";
import { useAuthUser } from "../zustand/authUser";
import toast from "react-hot-toast";

export const useAuth = () => {
  const setUser = useAuthUser((state) => state.setUser);

  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.success) {
        setUser(data.user);
        toast.success("Account created successfully.");
      } else {
        toast.error(data.message || "Registration failed");
      }
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
  });

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success) {
        setUser(data.user);
        toast.success("User logged in successfully.");
      } else {
        toast.error(data.message || "login failed");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
  });

  const isAuth = useMutation({
    mutationFn: authUser,
    onSuccess: (data) => {
      if (data.success) setUser(data.user);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
  });

  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      if (data.success) {
        setUser(null);
        toast.success("User logged out successfully.");
      }
      else{
        toast.error(data?.message || "logging out failed");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
  });
  return { register, login, isAuth, logout };
};
