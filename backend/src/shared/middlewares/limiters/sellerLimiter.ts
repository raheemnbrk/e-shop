import { createLimiter } from "../../utils/createLimiter";

export const applyLimiter = createLimiter(
  3,
  60 * 60 * 60,
  "Too many seller applications, please try again later.",
);
