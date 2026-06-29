import { createLimiter } from "../utils/createLimitter";

export const registerLimiter = createLimiter(
  5,
  60 * 60 * 1000,
  "Too many accounts created, please try again later",
);

export const loginLimiter = createLimiter(
  5,
  15 * 60 * 1000,
  "Too many login attempts, please try again later",
);

export const verifyOtpLimiter = createLimiter(
  10,
  15 * 60 * 1000,
  "Too many verification attempts, please try again later",
);

export const resendOtpLimiter = createLimiter(
  3,
  60 * 60 * 1000,
  "Too many resend requests, please try again in an hour",
);
