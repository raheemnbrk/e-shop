import { Router } from "express";
import { authorizeSeller } from "../../shared/middlewares/auth/authorizeSeller";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getRelatedProductsController,
  getSellerProductsController,
  getSingleProductController,
  toggleAvailabilityController,
  updateProductController,
} from "./productController";
import { upload } from "../../shared/config/multer";
import { authenticate } from "../../shared/middlewares/auth/authenticate";

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

productRouter.get("/:slug", getSingleProductController);

export default productRouter;
