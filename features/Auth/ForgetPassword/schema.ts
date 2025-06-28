import { z } from "zod";

export const ForgetPasswordSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  username: z
    .string()
    .min(5)
    .max(100)
    .regex(/^[a-z0-9._-]+$/),
  phoneNum: z.string().regex(/^(\+62|62|0)[0-9]{9,14}$/),
});

export type IForgetPasswordSchema = z.infer<typeof ForgetPasswordSchema>;
