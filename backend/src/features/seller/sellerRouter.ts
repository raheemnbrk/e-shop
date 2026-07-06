import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import {
  applySellerController,
  createProductController,
} from "./sellerController";
import { upload } from "../../shared/config/multer";
import { applyLimiter } from "../../shared/middlewares/limiters/sellerLimiter";
import { authorizeSeller } from "../../shared/middlewares/auth/authorizeSeller";

const sellerRouter = Router();

sellerRouter.post(
  "/apply",
  applyLimiter,
  authenticate,
  upload.single("logo"),
  applySellerController,
);

sellerRouter.post(
  "/create-product",
  authenticate,
  authorizeSeller,
  upload.array("images", 5),
  createProductController,
);

export default sellerRouter;
