import {
  createProductSchema,
  sellerApplicationSchema,
  sellerCustomersQuerySchema,
  updateProductSchema,
  updateSellerSchema,
} from "@/lib/validators/seller.schema";
import z from "zod";
import { Product } from "./productTypes";
import { Order, ordersStatusCount } from "./orderTypes";
import { TopCustomer, TopSellingProduct } from "./adminTypes";

export type applySellerInput = z.infer<typeof sellerApplicationSchema>;

export type updateSellerInput = z.infer<typeof updateSellerSchema>;

export type createProductInput = z.infer<typeof createProductSchema>;

export type updateProductInput = z.infer<typeof updateProductSchema>;

export interface SellerCustomer {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
  orders: number;
  totalSpent: number;
  lastOrder: Date;
}

export interface SellerCustomersResponse {
  customers: SellerCustomer[];
  pagination: Pagination;
}

export type sellerCustomersQueryInput = z.infer<
  typeof sellerCustomersQuerySchema
>;

export interface sellerDashboardStatsResponse {
  success: boolean;
  stats: {
    totalRevenue: number;
    totalCustomers: number;
    totalOrders: number;
    totalProducts: number;
  };
  lowStockProducts: Product[];
  recentOrders: Order[];
  topSellingProducts: TopSellingProduct[];
  topCustomers: TopCustomer[];
  ordersByStatus: ordersStatusCount[];
}
