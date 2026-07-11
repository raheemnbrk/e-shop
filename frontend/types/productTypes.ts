export interface ProductSeller {
  storeName: string;
  storeSlug: string;
  logo: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  available: boolean;
  createdAt: string;

  seller: ProductSeller;
  category: ProductCategory;
}
