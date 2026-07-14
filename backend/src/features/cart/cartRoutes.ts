import { Router } from "express";
import { addToCartController } from "./cartController";
import { authenticate } from "../../shared/middlewares/auth/authenticate";

const cartRouter = Router();

cartRouter.post("/add", authenticate, addToCartController);

export default cartRouter;
