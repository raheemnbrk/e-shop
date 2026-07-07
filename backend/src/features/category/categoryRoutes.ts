import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";
import {
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
} from "./categoryController";
import { upload } from "../../shared/config/multer";
import {
  getCategoriesController,
  getCategoryBySlugController,
} from "./categoryController";

const categoryRouter = Router();

categoryRouter.post(
  "/create-category",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  createCategoryController,
);
categoryRouter.get("/all", getCategoriesController);
categoryRouter.delete(
  "/delete/:id",
  authenticate,
  authorizeAdmin,
  deleteCategoryController,
);
categoryRouter.patch(
  "/update/:id",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  updateCategoryController,
);
categoryRouter.get("/:slug", getCategoryBySlugController);

export default categoryRouter;
