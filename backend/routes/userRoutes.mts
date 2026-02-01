import { Router } from "express";
import {
  isAuth,
  login,
  logout,
  registerUser,
} from "../controllers/userController.mts";
import authUser from "../middlewares/authUser.mts";

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/is-auth", authUser, isAuth);

export default userRouter;
