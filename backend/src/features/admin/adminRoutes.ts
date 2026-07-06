import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import {
  approveSellerController,
  createCategoryController,
  rejectSellerController,
} from "./adminController";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";
import { upload } from "../../shared/config/multer";

const adminRouter = Router();

adminRouter.patch(
  "/approve/:id",
  authenticate,
  authorizeAdmin,
  approveSellerController,
);

adminRouter.patch(
  "/reject/:id",
  authenticate,
  authorizeAdmin,
  rejectSellerController,
);

adminRouter.post(
  "/create-category",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  createCategoryController,
);

export default adminRouter;
