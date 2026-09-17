"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.resetPasswordSchema = exports.verifyOtpSchema = exports.forgotPasswordSchema = exports.resendOtpSchema = exports.otpSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default.object({
    firstName: zod_1.default
        .string()
        .min(1, "First name is required.")
        .min(3, "FirstName must be at least 3 characters."),
    lastName: zod_1.default
        .string()
        .min(1, "Last name is required.")
        .min(3, "LastName must br at least 3 characters."),
    email: zod_1.default.string().min(1, "email is required.").email("Invalid email."),
    password: zod_1.default
        .string()
        .min(1, "password is required.")
        .min(8, "Password must at least contains 8 characters."),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().min(1, "email is required.").email("Invalid email."),
    password: zod_1.default
        .string()
        .min(1, "password is required.")
        .min(8, "Password must at least contains 8 characters."),
});
exports.otpSchema = zod_1.default.object({
    email: zod_1.default.string().min(1, "Email is required").email("Invalid email."),
    otp: zod_1.default
        .string()
        .length(6, "OTP must be 6 digits")
        .regex(/^\d+$/, "OTP must contain only digits"),
});
exports.resendOtpSchema = zod_1.default.object({
    email: zod_1.default.string().min(1, "Email is required").email("Invalid email."),
});
exports.forgotPasswordSchema = zod_1.default.object({
    email: zod_1.default.string().min(1, "Email is required.").email("Invalid email."),
});
exports.verifyOtpSchema = zod_1.default.object({
    email: zod_1.default.string().min(1, "Email is required.").email("Invalid email."),
    otp: zod_1.default
        .string()
        .length(6, "The verification code must be 6 digits")
        .regex(/^\d+$/, "OTP must contain only digits"),
});
exports.resetPasswordSchema = zod_1.default.object({
    email: zod_1.default.string().min(1, "Email is required.").email("Invalid email."),
    password: zod_1.default
        .string()
        .min(1, "Password is required")
        .min(8, "Password must contains 8 characters."),
    resetToken: zod_1.default.string().min(1, "reset token is required."),
});
exports.changePasswordSchema = zod_1.default.object({
    currentPassword: zod_1.default
        .string()
        .min(1, "Password is required")
        .min(8, "Password must contains 8 characters."),
    newPassword: zod_1.default
        .string()
        .min(1, "Password is required")
        .min(8, "Password must contains 8 characters."),
});
