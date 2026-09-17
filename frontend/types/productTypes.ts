import {
  addReviewSchema,
  productQuerySchema,
} from "@/lib/validators/product.schema";
import z from "zod";
import { Category } from "./categoryTypes";

export interface ProductSeller {
  userId: string;
  storeName: string;
  storeSlug: string;
  logo: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
  image: string;
}

export interface ReviewUser {
  firstName: string;
  lastName: string;
  image: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  images: string[];
  available: boolean;
  createdAt: string;

  seller: ProductSeller;
  category: ProductCategory;
  reviews: Review[];
}

export type addReviewInput = z.infer<typeof addReviewSchema>;

export type productQueryInput = z.infer<typeof productQuerySchema>;

export interface allProductsResponse {
  products: Product[];
  pagination: Pagination & {
    totalItems: number;
  };
}

export interface homePageDataResponse {
  bestDeals: Product[];
  newArrivals: Product[];
  topSelling: Product[];
  categoriesWithCount: Category[];
}
