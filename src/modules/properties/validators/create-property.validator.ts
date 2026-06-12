import { z } from "zod";

export const createPropertySchema = z.object({

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  pricePerNight: z
    .number()
    .positive("Price per night must be greater than 0"),

  country: z
    .string()
    .trim()
    .min(1, "Country is required")
    .max(100, "Country must be less than 100 characters"),

  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City must be less than 100 characters"),

  address: z
    .string()
    .trim()
    .min(1, "Address is required"),

  maxGuests: z
    .number()
    .int()
    .positive("Max guests must be greater than 0"),

  bedrooms: z
    .number()
    .int()
    .positive("Bedrooms must be greater than 0"),

  bathrooms: z
    .number()
    .int()
    .positive("Bathrooms must be greater than 0")
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;