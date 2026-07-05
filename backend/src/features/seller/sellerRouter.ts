import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate";
import { applySellerController } from "./sellerController";
import { upload } from "../../shared/config/multer";
import { applyLimiter } from "../../shared/middlewares/limiters/sellerLimiter";

const sellerRouter = Router();

sellerRouter.post(
  "/apply",
  applyLimiter,
  authenticate,
  upload.single("logo"),
  applySellerController,
);

export default sellerRouter;
