import { Router } from "express";
import { upload } from "../../shared/config/multer";
import { authenticate } from "../../shared/middlewares/authenticate";
import {
  addAddressController,
  deleteAddressController,
  getAllAddressesController,
  getMeController,
  updateAddressController,
  updateProfileController,
} from "./userController";

const userRouter = Router();

userRouter.get("/me", authenticate, getMeController);
userRouter.patch(
  "/update-profile",
  authenticate,
  upload.single("image"),
  updateProfileController,
);
userRouter.get("/addresses", authenticate, getAllAddressesController);
userRouter.post("/add-address", authenticate, addAddressController);
userRouter.patch("/update-address/:id", authenticate, updateAddressController);
userRouter.delete("/delete-address/:id", authenticate, deleteAddressController);

export default userRouter;
