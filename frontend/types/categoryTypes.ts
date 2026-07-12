export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  parentId: string;
  productsCount : number;
  children: Category[];
}
