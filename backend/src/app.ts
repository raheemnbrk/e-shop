import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./features/auth/authRoutes";
import { errorHandler } from "./shared/middlewares/errorHandler";
import cors from "cors";
import passport from "./shared/config/passport";
import userRouter from "./features/user/userRoutes";
import sellerRouter from "./features/seller/sellerRouter";
import adminRouter from "./features/admin/adminRoutes";

const app = express();

const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL!];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

export default app;
