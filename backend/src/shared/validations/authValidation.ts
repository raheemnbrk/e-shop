import z from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .min(3, "FirstName must br at least 3 characters."),
  lastName: z
    .string()
    .min(1, "Last name is required.")
    .min(3, "LastName must br at least 3 characters."),
  email: z.string().min(1, "email is required.").email("Invalid email."),
  password: z
    .string()
    .min(1, "password is required.")
    .min(8, "Password must at least contains 8 characters."),
});

export const loginSchema = z.object({
  email: z.string().min(1, "email is required.").email("Invalid email."),
  password: z
    .string()
    .min(1, "password is required.")
    .min(8, "Password must at least contains 8 characters."),
});

export const otpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email."),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export const resendOtpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email."),
});
