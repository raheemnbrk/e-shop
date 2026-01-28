import express from "express";
import { Router } from "express";
import { login, registerUser } from "../controllers/userController.mts";

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", login);

export default userRouter;
