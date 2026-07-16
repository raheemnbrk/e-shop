import { addToCartSchema } from "@/lib/validators/product";
import z from "zod";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
  stock: number;
  slug: string;
}

export interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: string) => void;
}

export type addToCartInput = z.infer<typeof addToCartSchema>;

interface DbCartItem {
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    discount: number;
    images: string[];
    stock: number;
    slug: string;
  };
}

export interface CartResponse {
  id: string;
  userId: string;
  items: DbCartItem[];
  createdAt: string;
  updatedAt: string;
}
