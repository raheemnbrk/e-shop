import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import { addReviewController } from "./reviewController";

const reviewRouter = Router();

reviewRouter.post("/add/:productId", authenticate, addReviewController);

export default reviewRouter;
