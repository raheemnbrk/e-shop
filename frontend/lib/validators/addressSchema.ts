import z from "zod";

export const addAddressSchema = z.object({
  label: z.string().optional(),
  street: z.string().min(1, "street is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  country: z.string().min(1, "Country is required."),
  zipCode: z
    .string()
    .min(1, "Zip code code is required.")
    .regex(/^\d+$/, "Zip code must contain only digits")
    .length(5, "Zip code must contain 5 digits"),
  isDefault: z.boolean().optional().default(false),
});
