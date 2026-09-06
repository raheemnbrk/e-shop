import {
  createProductSchema,
  sellerApplicationSchema,
  sellerCustomersQuerySchema,
  updateProductSchema,
  updateSellerSchema,
} from "@/lib/validators/seller.schema";
import z from "zod";

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
