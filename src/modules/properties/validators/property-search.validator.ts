import { z } from "zod";
import { propertySortField, sortOrder } from "../../properties/types/property.types.js";


export const propertySearchSchema = z.object({
    city: z
    .string()
    .trim()
    .min(1)
    .optional(),

    minPrice: z
    .coerce
    .number()
    .positive()
    .optional(),

    maxPrice: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),
    
    minGuests: z
    .coerce
    .number()
    .int()
    .positive() 
    .optional(),
    
    bedrooms: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),
    
    isActive: z
    .coerce
    .boolean()
    .optional(),
});

export const propertyPaginationSchema = z.object({
     page: z
      .coerce
      .number()
      .int()
      .positive()
      .default(1),

    limit: z
      .coerce
      .number()
      .int()
      .positive()
      .max(100)
      .default(10),

    sortBy: z
    .enum(propertySortField, "Sort field can either be createdAt or price")
    .default("createdAt"),

    sortOrder: z
    .enum(sortOrder, "Sort order can either be asc or desc")
    .default("desc"),

});

export type PropertySearchInput  = z.infer<typeof propertySearchSchema>;
export type PropertyPaginationInput  = z.infer<typeof propertyPaginationSchema>;