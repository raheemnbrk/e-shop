import z from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .min(3, "FirstName must be at least 3 characters."),
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

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email."),
});

export const verifyOtpSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email."),
  otp: z
    .string()
    .length(6, "The verification code must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export const resetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email."),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must contains 8 characters."),
  resetToken: z.string().min(1, "reset token is required."),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must contains 8 characters."),
  newPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must contains 8 characters."),
});

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(3, "first name must be at least 3 characters.")
    .optional(),
  lastName: z
    .string()
    .min(3, "last name must be at least 3 characters.")
    .optional(),
  phoneNumber: z
    .string()
    .regex(
      /^(05|06|07)\d{8}$/,
      "Phone number must be a valid Algerian mobile number",
    )
    .length(10, "phone number must contains 10 digits.")
    .optional(),
});
