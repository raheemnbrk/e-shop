import {
  myOrdersQuerySchema,
  placeOrderSchema,
} from "@/lib/validators/order.schema";
import z from "zod";
import { User } from "./authTypes";
import { Address } from "./addressType";
import { Coupon } from "./couponTypes";
import { Product } from "./productTypes";
import { SellerUser } from "./adminTypes";

export type placeOrderInput = z.infer<typeof placeOrderSchema>;

export interface placeOrderResponse {
  success: boolean;
  message: string;
  orderId: string;
  paymentMethod: "ONLINE" | "CASH";
  checkoutUrl: string | null;
}

export interface orderItem {
  id: string;
  quantity: number;
  price: number;
  discount: number;
  productName: string;
  productSlug: string;
  productImage: string;
  product: Product;
  seller: SellerUser;
}

export type orderStatus =
  | "PENDING"
  | "PROCESSING"
  | "CANCELLED"
  | "SHIPPED"
  | "DELIVERED"
  | "CONFIRMED";

export interface Order {
  id: string;
  orderNumber: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  discount: number;
  status: orderStatus;
  deliveryMethod: "STANDARD" | "EXPRESS";
  paymentMethod: "ONLINE" | "CASH";
  paymentStatus: "PAID" | "UNPAID";
  stripeSessionId: string | null;
  note: string | null;
  user: User[];
  address: Address;
  coupon: Coupon[];
  items: orderItem[];
  createdAt: string;
}

export interface ordersStatusCount {
  status: orderStatus;
  count: number;
}

export interface ordersResponse {
  success: boolean;
  orders: Order[];
  statusCounts?: ordersStatusCount;
  totalOrders?: number;
  pagination: Pagination;
}

export type myOrdersQueryInput = z.infer<typeof myOrdersQuerySchema>;

export interface singleOrderResponse {
  order: Order;
  success: boolean;
}
