import { z } from "zod";

export const ForgetPasswordSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  username: z.string().min(3).max(20),
  phoneNum: z.string().min(10).max(15),
});

export type IForgetPasswordSchema = z.infer<typeof ForgetPasswordSchema>;
