import { z } from "zod";

export const SignUpSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(5)
    .max(100)
    .regex(/^[a-z0-9._-]+$/),
  phoneNum: z.string().regex(/^(\+62|62|0)[0-9]{9,14}$/),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Z])(?=.*[*\-#]).*$/),
});

export type ISignUpSchema = z.infer<typeof SignUpSchema>;
