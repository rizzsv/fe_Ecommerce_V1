import { z } from "zod";

export const EditProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
  image: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .refine(
      (value: File | string | undefined) => {
        if (value === undefined) return true;
        if (typeof value === "string") return value.trim() !== "";
        if (value instanceof File) return value.size > 0;
        return false;
      },
      { message: "Image is required" }
    ),
  category: z.string().optional(),
  status: z.string().optional(),
  variants: z
    .array(
      z.object({
        id: z.string().optional(),
        productId: z.string().optional(),
        size: z.string().optional(),
        color: z.string().optional(),
        stock: z.coerce.number().optional(),
      })
    )
    .optional(),
});

export type IEditProductSchema = z.infer<typeof EditProductSchema>;
