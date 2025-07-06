import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be at least 0"),
  size: z.number().min(1).max(50),
  quantity: z.number().min(0),
  createdAt: z.string(), // ISO string (timestamp), or use z.date() if needed
  status: z.enum(["Available", "Unavailable", "Out of Stock"]),
});

export type IProductSchema = z.infer<typeof ProductSchema>;
