import { z } from "zod";

export const ConfirmCodeSchema = z.object({
  id: z.string().optional(),
  code: z.string().min(2),
});

export type IConfirmCodeSchema = z.infer<typeof ConfirmCodeSchema>;
