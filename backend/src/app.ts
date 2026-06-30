import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./features/auth/authRoutes";
import { errorHandler } from "./shared/middlewares/errorHandler";
import cors from "cors";
import passport from "./shared/config/passport";

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

app.use(errorHandler);

export default app;
