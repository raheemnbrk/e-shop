import { createLimiter } from "../../utils/createLimiter";

export const addReviewLimiter = createLimiter(
  10,
  60 * 60 * 1000,
  "Too many accounts created, please try again later.",
);
