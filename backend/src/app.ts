import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./features/auth/authRoutes";
import { errorHandler } from "./shared/middlewares/errorHandler";
import cors from "cors";
import passport from "./shared/config/passport";
import userRouter from "./features/user/userRoutes";
import sellerRouter from "./features/seller/sellerRouter";
import adminRouter from "./features/admin/adminRoutes";
import productRouter from "./features/products/productRoutes";
import categoryRouter from "./features/category/categoryRoutes";
import reviewRouter from "./features/review/reviewRoutes";
import cartRouter from "./features/cart/cartRoutes";
import orderRouter from "./features/order/orderRouter";
import couponRouter from "./features/coupon/couponRoutes";
import { stripeWebhookController } from "./features/order/orderController";
import statsRouter from "./features/stats/statsRoutes";

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

app.post(
  "/api/webhooks/stripe",
  express.raw({
    type: "application/json",
  }),
  stripeWebhookController,
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/stats", statsRouter);

app.use(errorHandler);

export default app;
