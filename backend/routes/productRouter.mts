import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.mts";
import authAdmin from "../middlewares/authAdmin.mts";
import { upload } from "../configs/multerConfig.mts";

const productRouter = Router();

productRouter.post(
  "/add-product",
  authAdmin,
  upload.single("image"),
  addProduct,
);
productRouter.get("/get-products", getAllProducts);
productRouter.post("/delete-product", authAdmin, deleteProduct);
productRouter.post(
  "/update-product",
  authAdmin,
  upload.single("image"),
  updateProduct,
);

export default productRouter;
