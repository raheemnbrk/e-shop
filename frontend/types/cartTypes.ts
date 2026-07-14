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
}
