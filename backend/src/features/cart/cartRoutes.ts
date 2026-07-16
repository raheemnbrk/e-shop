import { Router } from "express";
import {
  addToCartController,
  getAllCartItemsController,
  removeItemFromCartController,
} from "./cartController";
import { authenticate } from "../../shared/middlewares/auth/authenticate";

const cartRouter = Router();

cartRouter.post("/add", authenticate, addToCartController);
cartRouter.get("/all", authenticate, getAllCartItemsController);
cartRouter.delete("/remove/:productId", authenticate, removeItemFromCartController);

export default cartRouter;
