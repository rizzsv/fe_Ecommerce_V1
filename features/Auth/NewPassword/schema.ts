import { z } from "zod";

export const NewPasswordSchema = z
  .object({
    id: z.string().optional(),
    newPassword: z.string().min(8),
    confirmationPassword: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmationPassword) {
      ctx.addIssue({
        path: ["confirmationPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export type INewPasswordSchema = z.infer<typeof NewPasswordSchema>;
