import {
  productQuerySchema,
  sellerQuerySchema,
  userQuerySchema,
} from "@/lib/validators/adminSchema";
import z from "zod";
import { SellerInfo, User } from "./authTypes";
import { Product } from "./productTypes";
import { Order } from "./orderTypes";

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
}
