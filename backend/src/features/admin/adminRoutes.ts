import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import {
  approveSellerController,
  changeRoleController,
  deleteUserController,
  getAllSellersController,
  getAllUsersController,
  getCustomerProfileController,
  rejectSellerController,
  updateOrderStatusController,
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

adminRouter.patch(
  "/users/change-role/:id",
  authenticate,
  authorizeAdmin,
  changeRoleController,
);

adminRouter.get(
  "/sellers",
  authenticate,
  authorizeAdmin,
  getAllSellersController,
);

adminRouter.get(
  "/users/:id",
  authenticate,
  authorizeAdmin,
  getCustomerProfileController,
);

adminRouter.patch(
  "/orders/update-status/:id",
  authenticate,
  authorizeAdmin,
  updateOrderStatusController,
);

export default adminRouter;
