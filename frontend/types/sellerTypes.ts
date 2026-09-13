import {
  createProductSchema,
  sellerApplicationSchema,
  sellerCustomersQuerySchema,
  updateOrderStatusSchema,
  updateProductSchema,
  updateSellerSchema,
} from "@/lib/validators/seller.schema";
import z from "zod";
import { Product } from "./productTypes";
import { Order, orderItem, ordersStatusCount, orderStatus } from "./orderTypes";
import { TopCustomer, TopSellingProduct } from "./adminTypes";
import { User } from "./authTypes";
import { Address } from "./addressType";

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

export interface sellerProfileResponse {
  seller: {
    userId: string;
    storeName: string;
    storeSlug: string;
    description: string;
    logo: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    user: User;
    products: Product[];
  };
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
}

export type updateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;

export type SellerOrderResponse = {
  id: string;
  orderNumber: string;
  status: orderStatus;
  createdAt: string;
  paymentMethod: string;
  paymentStatus: string;
  note?: string | null;

  user: User | null;
  address: Address | null;
  items: orderItem[];

  sellerSubtotal: number;
  sellerDiscount: number;
  sellerTotal: number;
};
