import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByTitle,
} from "../controllers/productController.mts";
import authAdmin from "../middlewares/authAdmin.mts";
import { upload } from "../configs/multerConfig.mts";

const productRouter = Router();

productRouter.post(
  "/add-product",
  authAdmin,
  upload.array("images"),
  addProduct,
);
productRouter.post("/get-products", getAllProducts);
productRouter.post("/get-product-by-id", getProductById);
productRouter.post("/get-product-by-title", getProductByTitle);
productRouter.post("/delete-product", authAdmin, deleteProduct);
