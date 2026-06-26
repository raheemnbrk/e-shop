import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./features/auth/authRoutes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;
