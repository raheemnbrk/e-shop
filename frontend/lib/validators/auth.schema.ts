import z from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(3, "First name must be at least 3 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(3, "Last name must be at least 3 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must at least contains 8 characters."),
});

export const verifyOtpSchema = z.object({
  email: z.string().min(1, "Email is required."),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export const forgetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email."),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().min(1, "Email is required.").email("Invalid email."),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must contains 8 characters."),
    confirmedPassword: z.string().min(1, "Please confirm your password."),
    resetToken: z.string().min(1, "reset token is required."),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Password do not match.",
    path: ["confirmedPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password is required"),
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must contains 8 characters."),
    confirmedNewPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must contains 8 characters."),
  })
  .refine((data) => data.newPassword === data.confirmedNewPassword, {
    message: "Password do not match.",
    path: ["confirmedNewPassword"],
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
