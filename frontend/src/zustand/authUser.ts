import { create } from "zustand";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

type authUser = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useAuthUser = create<authUser>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
