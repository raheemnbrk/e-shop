import {
  sellerQuerySchema,
  userQuerySchema,
} from "@/lib/validators/adminSchema";
import z from "zod";
import { SellerInfo, User } from "./authTypes";

export type userQueryInput = z.infer<typeof userQuerySchema>;

export interface allUserResponse {
  success: true;
  users: User[];
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
