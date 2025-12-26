import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be at least 0"),
  image: z.string().min(1, "Image is required"),
  categoryId: z.string(),
  categoryName: z.string(),
  createdAt: z.string(),
});

export type IProductSchema = z.infer<typeof ProductSchema>;
