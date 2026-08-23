import { Router } from "express";
import { authorizeSeller } from "../../shared/middlewares/auth/authorizeSeller";
import {
  adminDeleteProductController,
  createProductController,
  deleteProductController,
  getAdminProductsController,
  getAllProductsController,
  getRelatedProductsController,
  getSellerProductsController,
  getSingleProductController,
  toggleAvailabilityController,
  updateProductController,
} from "./productController";
import { upload } from "../../shared/config/multer";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";

const productRouter = Router();

productRouter.post(
  "/create-product",
  authenticate,
  authorizeSeller,
  upload.array("images", 5),
  createProductController,
);

productRouter.get("/all", getAllProductsController);

productRouter.delete(
  "/delete/:id",
  authenticate,
  authorizeSeller,
  deleteProductController,
);

productRouter.patch(
  "/update/:id",
  authenticate,
  authorizeSeller,
  upload.array("images", 5),
  updateProductController,
);

productRouter.patch(
  "/toggle-availability/:id",
  authenticate,
  authorizeSeller,
  toggleAvailabilityController,
);

productRouter.get("/related/:slug", getRelatedProductsController);

productRouter.get(
  "/seller-products",
  authenticate,
  authorizeSeller,
  getSellerProductsController,
);

productRouter.get(
  "/admin-products",
  authenticate,
  authorizeAdmin,
  getAdminProductsController,
);

productRouter.delete(
  "/admin-delete/:id",
  authenticate,
  authorizeAdmin,
  adminDeleteProductController,
);

productRouter.get("/:slug", getSingleProductController);

export default productRouter;
