import {
  productQuerySchema,
  sellerQuerySchema,
  updateOrderStatusSchema,
  userQuerySchema,
} from "@/lib/validators/adminSchema";
import z from "zod";
import { SellerInfo, User } from "./authTypes";
import { Product } from "./productTypes";
import { Order, ordersStatusCount } from "./orderTypes";

export type userQueryInput = z.infer<typeof userQuerySchema>;

export interface allUserResponse {
  success: true;
  users: User[];
  pagination: Pagination;
}

export interface allProductsResponse {
  success: true;
  products: Product[];
  pagination: Pagination;
}

export interface SellerUser extends Omit<User, "role" | "isVerified"> {
  Seller: SellerInfo;
}

export interface allSellersResponse {
  success: true;
  sellers: SellerUser[];
  pagination: Pagination;
}

export type sellerQueryInput = z.infer<typeof sellerQuerySchema>;

export type productQueryInput = z.infer<typeof productQuerySchema>;

export interface TopSellingProduct {
  productId: string;
  productName: string;
  productImage: string;
  productSlug: string;
  sold: number;
}

export interface TopCustomer {
  userId: string;
  firstName: string;
  lastName: string;
  image: string | null;
  totalSpent: number;
  orders: number;
}

export type DashboardPeriod = "7d" | "30d" | "12m";

export interface SalesChartItem {
  date: string;
  sales: number;
  orders: number;
}

export interface SalesChart {
  period: DashboardPeriod;
  totalSales: number;
  totalOrders: number;
  data: SalesChartItem[];
}

export interface dashboardStatsResponse {
  success: boolean;
  stats: {
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    totalSellers: number;
  };
  recentOrders: Order[];
  lowStockProducts: Product[];
  topSellingProducts: TopSellingProduct[];
  topCustomers: TopCustomer[];
  ordersByStatus: ordersStatusCount[];
}
export interface dashboardSalesStatsResponse {
  success: boolean;
  salesChart: SalesChart;
}

export type CustomerProfileStats = {
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  lastOrderDate: string | null;
};

export type CustomerProfileResponse = {
  success: boolean;
  result: {
    user: User;
    stats: CustomerProfileStats;
    recentOrders: Order[];
    cancelledOrders: number;
  };
};

export type updateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
