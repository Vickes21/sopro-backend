import { z } from "zod/v4";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
});

export type TUpdateUser = z.infer<typeof updateUserSchema>;
  
