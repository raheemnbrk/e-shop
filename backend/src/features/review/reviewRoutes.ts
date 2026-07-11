import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import { addReviewController } from "./reviewController";
import { addReviewLimiter } from "../../shared/middlewares/limiters/reviewLimiter";

const reviewRouter = Router();

reviewRouter.post(
  "/add/:productId",
  authenticate,
  addReviewLimiter,
  addReviewController,
);

export default reviewRouter;
