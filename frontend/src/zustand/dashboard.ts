import { create } from "zustand";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "customer";
};

type dashboardStats = {
  totalUsers: number;
  totalCustomers: number;
  totalAdmins: number;
  totalOrders: number;
  totalProducts: number;
};

type useDashboard = {
  users: User[];
  setUsers: (users: User[]) => void;
  dashboardStats: dashboardStats;
  setDashboardStats: (stats: dashboardStats) => void;
};

export const useDashboard = create<useDashboard>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  dashboardStats: {
    totalUsers: 0,
    totalCustomers: 0,
    totalAdmins: 0,
    totalOrders: 0,
    totalProducts: 0,
  },

  setDashboardStats: (stats) => set({ dashboardStats: stats }),
}));
