import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate";
import { applySellerController } from "./sellerController";
import { upload } from "../../shared/config/multer";

const sellerRouter = Router();

sellerRouter.post(
  "/apply",
  authenticate,
  upload.single("logo"),
  applySellerController,
);

export default sellerRouter;
