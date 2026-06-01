import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Please provide a valid email address"),

  
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),

  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters")
});

export type RegisterInput = z.infer<typeof registerSchema>;