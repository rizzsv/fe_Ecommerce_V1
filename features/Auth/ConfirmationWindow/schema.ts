import { z } from "zod";

export const ConfirmCodeSchema = z.object({
  id: z.string().optional(),
  otp: z.string().length(6),
});

export type IConfirmCodeSchema = z.infer<typeof ConfirmCodeSchema>;
