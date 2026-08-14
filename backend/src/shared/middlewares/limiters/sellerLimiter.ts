import { createLimiter } from "../../utils/createLimiter";

export const applyLimiter = createLimiter(
  3,
  60 * 60 * 1000,
  "Too many seller applications, please try again later.",
);

export const updateSellerLimiter = createLimiter(
  8,
  15 * 60 * 1000,
  "Too many requests please try again.",
);
