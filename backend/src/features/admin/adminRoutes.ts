import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate";
import {
  approveSellerController,
  rejectSellerController,
} from "./adminController";
import { authorizeAdmin } from "../../shared/middlewares/authorizeAdmin";

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

export default adminRouter;
