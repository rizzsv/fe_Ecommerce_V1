import { z } from "zod";

export const SignInSchema = z.object({
  id: z.string().optional(),
  identity: z.string().nonempty(),
  password: z.string().min(6),
});

export type ISignInSchema = z.infer<typeof SignInSchema>;
