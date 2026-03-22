import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./configs/dbConfig.mts";
import userRouter from "./routes/userRoutes.mts";
import connectCloudinary from "./configs/cloudinaryConfig.mts";
import productRouter from "./routes/productRouter.mts";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

await connectDB();
connectCloudinary();

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  console.log("hello world");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
