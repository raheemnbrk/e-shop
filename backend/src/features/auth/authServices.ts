import { Role } from "../../generated/prisma";
import prisma from "../../shared/config/prisma";
import {
  AuthResponse,
  loginInput,
  Payload,
  registerInput,
} from "../../shared/types/authTypes";
import { ApiError } from "../../shared/utils/apiError";
import bcrypt from "bcrypt";
import {
  REFRESH_TOKEN_EXPIRES_MS,
  signAccessToken,
  signRefreshToken,
} from "../../shared/utils/jwt";

export const registerService = async (input: registerInput) => {
  const { firstName, lastName, email, password } = input;

  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) throw new ApiError(409, "User already exists.");

  const hashed = await bcrypt.hash(password, 10);

  const adminEmails =
    process.env.ADMIN_EMAILS!.split(",").map((email) => email.trim()) ?? [];

  const role: Role = adminEmails.includes(email) ? "ADMIN" : "CUSTOMER";

  const user = await prisma.user.create({
    data: { firstName, lastName, email, password: hashed, role: role },
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

  return { accessToken, refreshToken, user } as AuthResponse;
};

export const loginService = async (input: loginInput) => {
  const { email, password } = input;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(401, "Invalid credentials.");

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
