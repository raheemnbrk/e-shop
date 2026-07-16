import { Router } from "express";
import { addToCartController, getAllCartItemsController } from "./cartController";
import { authenticate } from "../../shared/middlewares/auth/authenticate";

const cartRouter = Router();

cartRouter.post("/add", authenticate, addToCartController);
cartRouter.get("/all", authenticate, getAllCartItemsController);

export default cartRouter;
