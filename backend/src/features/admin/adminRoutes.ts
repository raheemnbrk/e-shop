import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import {
  approveSellerController,
  deleteUserController,
  getAllSellersController,
  getAllUsersController,
  rejectSellerController,
} from "./adminController";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";

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

adminRouter.get("/users", authenticate, authorizeAdmin, getAllUsersController);

adminRouter.delete(
  "/users/delete/:id",
  authenticate,
  authorizeAdmin,
  deleteUserController,
);

adminRouter.get(
  "/sellers",
  authenticate,
  authorizeAdmin,
  getAllSellersController,
);

export default adminRouter;
