import { z } from "zod";

export const NewPasswordSchema = z
  .object({
    id: z.string().optional(),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[A-Z])(?=.*[*\-#]).*$/),
    confirmationPassword: z
      .string()
      .min(8)
      .regex(/^(?=.*[A-Z])(?=.*[*\-#]).*$/),
  })
  .refine((data) => data.password === data.confirmationPassword, {
    path: ["confirmationPassword"],
    message: "Password tidak cocok",
  });

export type INewPasswordSchema = z.infer<typeof NewPasswordSchema>;
