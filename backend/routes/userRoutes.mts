import express from "express";
import { Router } from "express";
import { login, logout, registerUser } from "../controllers/userController.mts";

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
