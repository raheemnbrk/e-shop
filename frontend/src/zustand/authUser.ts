import { create } from "zustand";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "customer";
};

type authUser = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthUser = create<authUser>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loading: true,
  setLoading: (loading) => set({ loading }),
}));
