import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByTitle,
  updateProduct,
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
productRouter.get("/get-products", getAllProducts);
productRouter.get("/get-product-by-id", getProductById);
productRouter.get("/get-product-by-title", getProductByTitle);
productRouter.post("/delete-product", authAdmin, deleteProduct);
productRouter.post("/update-product", authAdmin, updateProduct);

export default productRouter