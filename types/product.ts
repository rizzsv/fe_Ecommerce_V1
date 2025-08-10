export interface Variant {
  stock?: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  price: number;
  stock?: number;
  variants?: Variant[];
  status?: string;
  images?: string[];
  createdAt?: string;
}
