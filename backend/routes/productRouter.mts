import express from "express";
import { Router } from "express";
import { addProduct } from "../controllers/productController.mts";

const productRouter = Router();

productRouter.post("/add-product", addProduct);
