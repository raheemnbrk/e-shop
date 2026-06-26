import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "./authControllers";
import {
  loginLimiter,
  registerLimiter,
} from "../../shared/middlewares/authLimiter";

const authRouter = Router();

authRouter.post("/register", registerLimiter, registerController);
authRouter.post("/login", loginLimiter, loginController);
authRouter.post("/logout", logoutController);
authRouter.post("/refresh", refreshController);

export default authRouter;
