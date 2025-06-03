import { z } from "zod/v4";

// Create a proper Zod schema for login
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type TLoginDto = z.infer<typeof loginSchema>;
