import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),

  password: z
    .string()
    .min(8),

  firstName: z
    .string()
    .trim()
    .min(1)
    .max(100),

  lastName: z
    .string()
    .trim()
    .min(1)
    .max(100)
});

export type RegisterInput =
  z.infer<typeof registerSchema>;