import { AuthStore } from "@/types/authTypes";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user, accessToken) => set({ user, accessToken }),
  setUser: (user) => set({ user }),
  loading: true,
  setLoading: (loading) => set({ loading }),
  setAccessToken: (token) => set({ accessToken: token }),
  clearAuth: () => set({ user: null, accessToken: null }),
}));
