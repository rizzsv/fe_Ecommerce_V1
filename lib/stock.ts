import { Product } from "@/types/product";

export const getTotalStockByCategory = (
  products: Product[],
  categoryId: string
) => {
  return products
    .filter((product) => product.categoryId === categoryId)
    .reduce((total, product) => total + (product.stock ?? 0), 0);
};

export const getTotalStock = (products: Product[]) => {
  return products.reduce((total, product) => total + (product.stock ?? 0), 0);
};
