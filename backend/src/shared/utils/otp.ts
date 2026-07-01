import redis from "../config/redis";

const OTP_TTL = 10 * 60;

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const saveOtp = async (email: string, otp: string) => {
  await redis.set(`otp:${email}`, otp, "EX", OTP_TTL);
};

export const verifyOtp = async (
  email: string,
  otp: string,
): Promise<Boolean> => {
  const stored = await redis.get(`otp:${email}`);
  if (!stored || stored !== otp) return false;
  await redis.del(`otp:${email}`);
  return true;
};

export const saveResetOtp = async (email: string, otp: string) => {
  await redis.set(`otp:reset:${email}`, otp, "EX", OTP_TTL);
};

export const verifyResetOtp = async (
  email: string,
  otp: string,
): Promise<Boolean> => {
  const stored = await redis.get(`otp:reset:${email}`);
  if (!stored || stored !== otp) return false;
  await redis.del(`otp:reset:${email}`);
  return true;
};

export const saveResetToken = async (email: string, token: string) => {
  await redis.set(`reset-token:${email}`, token, "EX", 15 * 60);
};

export const verifyResetToken = async (
  email: string,
  token: string,
): Promise<Boolean> => {
  const stored = await redis.get(`reset-token:${email}`);
  if (!stored || stored !== token) return false;
  await redis.del(`reset-token : ${email}`);
  return true;
};
