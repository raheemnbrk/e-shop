"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordService = exports.resetPasswordService = exports.verifyResetPasswordOtpService = exports.forgotPasswordService = exports.googleAuthService = exports.refreshTokenService = exports.logoutService = exports.loginService = exports.resendOtpService = exports.verifyOtpService = exports.registerService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const apiError_1 = require("../../shared/utils/apiError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../shared/utils/jwt");
const otp_1 = require("../../shared/utils/otp");
const emailActions_1 = require("../../shared/utils/emails/emailActions");
const registerService = async (input) => {
    const { firstName, lastName, email, password } = input;
    const existingUser = await prisma_1.default.user.findFirst({ where: { email } });
    if (existingUser && existingUser.isVerified)
        throw new apiError_1.ApiError(409, "User already exists.");
    if (existingUser && !existingUser.isVerified)
        await prisma_1.default.user.delete({ where: { email } });
    const hashed = await bcrypt_1.default.hash(password, 10);
    const adminEmails = process.env.ADMIN_EMAILS.split(",").map((email) => email.trim()) ?? [];
    const role = adminEmails.includes(email) ? "ADMIN" : "CUSTOMER";
    await prisma_1.default.user.create({
        data: { firstName, lastName, email, password: hashed, role },
        omit: { password: true },
    });
    const otp = (0, otp_1.generateOTP)();
    await (0, otp_1.saveOtp)(email, otp);
    await (0, emailActions_1.sendOtpEmail)(email, otp);
    return { message: "Verification code is sent to your email." };
};
exports.registerService = registerService;
const verifyOtpService = async (input) => {
    const { email, otp } = input;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found");
    if (user.isVerified)
        throw new apiError_1.ApiError(400, "Email is already in use.");
    const valid = await (0, otp_1.verifyOtp)(email, otp);
    if (!valid)
        throw new apiError_1.ApiError(400, "Invalid or expired code.");
    const verifiedUser = await prisma_1.default.user.update({
        where: { email },
        data: { isVerified: true },
        omit: { password: true },
    });
    const payload = { id: user.id, role: user.role };
    const refreshToken = (0, jwt_1.signRefreshToken)(payload);
    const accessToken = (0, jwt_1.signAccessToken)(payload);
    await prisma_1.default.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiredAt: new Date(Date.now() + jwt_1.REFRESH_TOKEN_EXPIRES_MS),
        },
    });
    return { accessToken, refreshToken, user: verifiedUser };
};
exports.verifyOtpService = verifyOtpService;
const resendOtpService = async (input) => {
    const { email } = input;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found");
    if (user.isVerified)
        throw new apiError_1.ApiError(400, "Email is already verified.");
    const otp = (0, otp_1.generateOTP)();
    await (0, otp_1.saveOtp)(email, otp);
    await (0, emailActions_1.sendOtpEmail)(email, otp);
    return { message: "New verification code sent." };
};
exports.resendOtpService = resendOtpService;
const loginService = async (input) => {
    const { email, password } = input;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new apiError_1.ApiError(401, "Invalid credentials.");
    if (!user.password) {
        throw new apiError_1.ApiError(400, "This account uses Google sign-in. Please continue with Google.");
    }
    const valid = await bcrypt_1.default.compare(password, user.password);
    if (!valid)
        throw new apiError_1.ApiError(401, "Invalid credentials.");
    if (!user.isVerified) {
        const otp = (0, otp_1.generateOTP)();
        await (0, otp_1.saveOtp)(email, otp);
        await (0, emailActions_1.sendOtpEmail)(email, otp);
        return { verified: false };
    }
    const payload = { id: user.id, role: user.role };
    const accessToken = (0, jwt_1.signAccessToken)(payload);
    const refreshToken = (0, jwt_1.signRefreshToken)(payload);
    await prisma_1.default.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiredAt: new Date(Date.now() + jwt_1.REFRESH_TOKEN_EXPIRES_MS),
        },
    });
    return {
        verified: true,
        accessToken,
        refreshToken,
        user,
    };
};
exports.loginService = loginService;
const logoutService = async (token) => {
    await prisma_1.default.refreshToken.updateMany({
        where: { token },
        data: { isRevoked: true },
    });
};
exports.logoutService = logoutService;
const refreshTokenService = async (token) => {
    const stored = await prisma_1.default.refreshToken.findFirst({
        where: { token },
        include: { user: true },
    });
    if (!stored || stored.isRevoked || stored.expiredAt < new Date())
        throw new apiError_1.ApiError(401, "Unauthorized access. Please login again.");
    const payload = { id: stored.user.id, role: stored.user.role };
    const refreshToken = (0, jwt_1.signRefreshToken)(payload);
    const accessToken = (0, jwt_1.signAccessToken)(payload);
    await prisma_1.default.refreshToken.update({
        where: { id: stored.id },
        data: { isRevoked: true, replacedBy: refreshToken },
    });
    await prisma_1.default.refreshToken.create({
        data: {
            token: refreshToken,
            expiredAt: new Date(Date.now() + jwt_1.REFRESH_TOKEN_EXPIRES_MS),
            userId: stored.user.id,
        },
    });
    await prisma_1.default.refreshToken.deleteMany({
        where: { userId: stored.userId, expiredAt: { lt: new Date() } },
    });
    const user = await prisma_1.default.user.findUnique({
        where: { id: stored.userId },
        omit: { password: true },
    });
    return { user, accessToken, refreshToken };
};
exports.refreshTokenService = refreshTokenService;
const googleAuthService = async (user) => {
    const payload = { id: user.id, role: user.role };
    const accessToken = (0, jwt_1.signAccessToken)(payload);
    const refreshToken = (0, jwt_1.signRefreshToken)(payload);
    await prisma_1.default.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiredAt: new Date(Date.now() + jwt_1.REFRESH_TOKEN_EXPIRES_MS),
        },
    });
    return { accessToken, refreshToken, user };
};
exports.googleAuthService = googleAuthService;
const forgotPasswordService = async (input) => {
    const { email } = input;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found.");
    if (!user.password) {
        throw new apiError_1.ApiError(400, "This account uses Google sign-in. No password to change.");
    }
    const otp = (0, otp_1.generateOTP)();
    await (0, otp_1.saveResetOtp)(email, otp);
    await (0, emailActions_1.sendPasswordResetOtpEmail)(email, otp);
    return { message: "Password reset code sent to your email" };
};
exports.forgotPasswordService = forgotPasswordService;
const verifyResetPasswordOtpService = async (input) => {
    const { email, otp } = input;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found");
    const valid = await (0, otp_1.verifyResetOtp)(email, otp);
    if (!valid)
        throw new apiError_1.ApiError(400, "Invalid or expired code.");
    const resetToken = crypto_1.default.randomUUID();
    await (0, otp_1.saveResetToken)(email, resetToken);
    return { resetToken };
};
exports.verifyResetPasswordOtpService = verifyResetPasswordOtpService;
const resetPasswordService = async (input) => {
    const { email, password, resetToken } = input;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found");
    const valid = await (0, otp_1.verifyResetToken)(email, resetToken);
    if (!valid)
        throw new apiError_1.ApiError(400, "Invalid or expired token.");
    const hashed = await bcrypt_1.default.hash(password, 10);
    await prisma_1.default.user.update({ where: { email }, data: { password: hashed } });
    return { message: "Password reset successfully." };
};
exports.resetPasswordService = resetPasswordService;
const changePasswordService = async (input, userId) => {
    const { currentPassword, newPassword } = input;
    const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found.");
    if (!user.password) {
        throw new apiError_1.ApiError(400, "This account uses Google sign-in. No password to change.");
    }
    const valid = await bcrypt_1.default.compare(currentPassword, user.password);
    if (!valid)
        throw new apiError_1.ApiError(400, "Current password is incorrect.");
    const isSame = await bcrypt_1.default.compare(newPassword, user.password);
    if (isSame)
        throw new apiError_1.ApiError(400, "New password must not match the old password.");
    const hashed = await bcrypt_1.default.hash(newPassword, 10);
    await prisma_1.default.user.update({
        where: { id: userId },
        data: { password: hashed },
    });
    return { message: "Password successfully changed." };
};
exports.changePasswordService = changePasswordService;
