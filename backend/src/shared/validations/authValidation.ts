import z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(3, "FirstName must br at least 3 characters."),
  lastName: z.string().min(3, "LastName must br at least 3 characters."),
  email: z.string().email("Invalid email."),
  password: z.string().min(8, "Password must at least contains 8 characters."),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(8, "Password must at least contains 8 characters."),
});
