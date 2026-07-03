import crypto from "crypto";
import { Role, User } from "../../generated/prisma";
import prisma from "../../shared/config/prisma";
import {
  AuthResponse,
  changePasswordInput,
  forgotPasswordInput,
  loginInput,
  otpInput,
  Payload,
  registerInput,
  resendOtpInout,
  resetPasswordInput,
  verifyResetOtpInput,
} from "../../shared/types/authTypes";
import { ApiError } from "../../shared/utils/apiError";
import bcrypt from "bcrypt";
import {
  REFRESH_TOKEN_EXPIRES_MS,
  signAccessToken,
  signRefreshToken,
} from "../../shared/utils/jwt";
import {
  generateOTP,
  saveOtp,
  saveResetOtp,
  saveResetToken,
  verifyOtp,
  verifyResetOtp,
  verifyResetToken,
} from "../../shared/utils/otp";
import { sendOtpEmail } from "../../shared/utils/email";

export const registerService = async (input: registerInput) => {
  const { firstName, lastName, email, password } = input;

  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser && existingUser.isVerified)
    throw new ApiError(409, "User already exists.");

  if (existingUser && !existingUser.isVerified)
    await prisma.user.delete({ where: { email } });

  const hashed = await bcrypt.hash(password, 10);

  const adminEmails =
    process.env.ADMIN_EMAILS!.split(",").map((email) => email.trim()) ?? [];

  const role: Role = adminEmails.includes(email) ? "ADMIN" : "CUSTOMER";

  await prisma.user.create({
    data: { firstName, lastName, email, password: hashed, role },
    omit: { password: true },
  });

  const otp = generateOTP();
  await saveOtp(email, otp);
  await sendOtpEmail(email, otp);

  return { message: "Verification code is sent to your email." };
};

export const verifyOtpService = async (input: otpInput) => {
  const { email, otp } = input;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "User not found");
  if (user.isVerified) throw new ApiError(400, "Email is already in use.");

  const valid = await verifyOtp(email, otp);
  if (!valid) throw new ApiError(400, "Invalid or expired code.");

  const verifiedUser = await prisma.user.update({
    where: { email },
    data: { isVerified: true },
    omit: { password: true },
  });

  const payload: Payload = { id: user.id, role: user.role };

  const refreshToken = signRefreshToken(payload);
  const accessToken = signAccessToken(payload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiredAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
    },
  });

  return { accessToken, refreshToken, user: verifiedUser } as AuthResponse;
};

export const resendOtpService = async (input: resendOtpInout) => {
  const { email } = input;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "User not found");
  if (user.isVerified) throw new ApiError(400, "Email is already in use.");

  const otp = generateOTP();
  await saveOtp(email, otp);
  await sendOtpEmail(email, otp);

  return { message: "New verification code sent." };
};

export const loginService = async (input: loginInput) => {
  const { email, password } = input;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(401, "Invalid credentials.");

  if (!user.password) {
    throw new ApiError(
      400,
      "This account uses Google sign-in. Please continue with Google.",
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new ApiError(401, "Invalid credentials.");

  const payload: Payload = { id: user.id, role: user.role };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiredAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
    },
  });

  return {
    accessToken,
    refreshToken,
    user,
  } as AuthResponse;
};

export const logoutService = async (token: string) => {
  await prisma.refreshToken.updateMany({
    where: { token },
    data: { isRevoked: true },
  });
};

export const refreshTokenService = async (token: string) => {
  const stored = await prisma.refreshToken.findFirst({
    where: { token },
    include: { user: true },
  });
  if (!stored || stored.expiredAt < new Date())
    throw new ApiError(401, "Unauthorized access. Please login again.");

  const payload: Payload = { id: stored.user.id, role: stored.user.role };

  const refreshToken = signRefreshToken(payload);
  const accessToken = signAccessToken(payload);

  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { isRevoked: true, replacedBy: refreshToken },
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      expiredAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
      userId: stored.user.id,
    },
  });

  await prisma.refreshToken.deleteMany({
    where: { id: stored.userId, expiredAt: { lt: new Date() } },
  });

  const user = await prisma.user.findUnique({
    where: { id: stored.userId },
    omit: { password: true },
  });

  return { user, accessToken, refreshToken };
};

export const googleAuthService = async (user: User) => {
  const payload: Payload = { id: user.id, role: user.role };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiredAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
    },
  });

  return { accessToken, refreshToken, user } as AuthResponse;
};

export const forgotPasswordService = async (input: forgotPasswordInput) => {
  const { email } = input;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "User not found.");

  if (!user.password) {
    throw new ApiError(
      400,
      "This account uses Google sign-in. No password to change.",
    );
  }

  const otp = generateOTP();
  await saveResetOtp(email, otp);
  await sendOtpEmail(email, otp);

  return { message: "Password reset code sent to your email" };
};

export const verifyResetPasswordOtpService = async (
  input: verifyResetOtpInput,
) => {
  const { email, otp } = input;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "User not found");

  const valid = await verifyResetOtp(email, otp);
  if (!valid) throw new ApiError(400, "Invalid or expired code.");

  const resetToken = crypto.randomUUID();
  await saveResetToken(email, resetToken);

  return { resetToken };
};

export const resetPasswordService = async (input: resetPasswordInput) => {
  const { email, password, resetToken } = input;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "User not found");

  const valid = await verifyResetToken(email, resetToken);
  if (!valid) throw new ApiError(400, "Invalid or expired token.");

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.update({ where: { email }, data: { password: hashed } });

  return { message: "Password reset successfully." };
};

export const changePasswordService = async (
  input: changePasswordInput,
  userId: string,
) => {
  const { currentPassword, newPassword } = input;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new ApiError(404, "User not found.");

  if (!user.password) {
    throw new ApiError(
      400,
      "This account uses Google sign-in. No password to change.",
    );
  }

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) throw new ApiError(400, "Current password is incorrect.");

  const isSame = await bcrypt.compare(newPassword, user.password);
  if (isSame)
    throw new ApiError(400, "New password must not match the old password.");

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });

  return { message: "Password successfully changed." };
};


