import { z } from "zod/v4";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  phone: z.string().min(11),
  password: z.string().min(6),
});

export type TRegisterDto = z.infer<typeof registerSchema>;
