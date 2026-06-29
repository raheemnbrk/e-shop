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
