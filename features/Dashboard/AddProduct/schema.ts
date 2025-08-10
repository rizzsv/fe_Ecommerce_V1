import { z } from "zod";

export const CreateProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  image: z.union([z.instanceof(File), z.string()]).refine(
    (value: File | string) => {
      if (typeof value === "string") return value.trim() !== "";
      if (value instanceof File) return value.size > 0;
      return false;
    },
    { message: "Image is required" }
  ),
  category: z.string(),
  status: z.string().optional(),
  variants: z.array(
    z.object({
      id: z.string().optional(),
      productId: z.string().optional(),
      size: z.string().min(1, "Size is required"),
      color: z.string().min(1, "Color is required"),
    })
  ),
});

export type ICreateProductSchema = z.infer<typeof CreateProductSchema>;
