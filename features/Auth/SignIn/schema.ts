import { z } from "zod";

export const SignInSchema = z.object({
  id: z.string().optional(),
  identity: z.string().min(3),
  password: z.string().min(8),
});

export type ISignInSchema = z.infer<typeof SignInSchema>;
