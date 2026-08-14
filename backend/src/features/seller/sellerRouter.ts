import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import {
  applySellerController,
  updateSellerController,
} from "./sellerController";
import { upload } from "../../shared/config/multer";
import {
  applyLimiter,
  updateSellerLimiter,
} from "../../shared/middlewares/limiters/sellerLimiter";
import { authorizeSeller } from "../../shared/middlewares/auth/authorizeSeller";

const sellerRouter = Router();

sellerRouter.post(
  "/apply",
  applyLimiter,
  authenticate,
  upload.single("logo"),
  applySellerController,
);

sellerRouter.patch(
  "/update",
  updateSellerLimiter,
  authenticate,
  authorizeSeller,
  upload.single("logo"),
  updateSellerController,
);

export default sellerRouter;
