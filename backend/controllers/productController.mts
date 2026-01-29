import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.mts";
import { z } from "zod";

const addProductSchema = z.object({
  productName: z.string().min(2),
  category: z.string().min(2),
  price: z.number().positive(),
  discount: z.number().min(0).max(100),
  brand: z.string().optional(),
  description: z.string().min(10),
  rating: z.number().min(0).max(5),
  availability: z.boolean(),
  warranty: z.string(),
  shippingInformation: z.string(),
  returnPolicy: z.string(),
});

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      productName,
      category,
      price,
      discount,
      brand,
      description,
      rating,
      availability,
      warranty,
      shippingInformation,
      returnPolicy,
    } = addProductSchema.parse(req.body);

    const images = req.files as Express.Multer.File[];

    if (!images || images.length === 0) {
      res.status(400).json({ success: false, message: "Images are required" });
      return;
    }

    let images_url = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );
    const newProduct = await Product.create({
      productName,
      category,
      price,
      discount,
      brand,
      description,
      rating,
      availability,
      warranty,
      shippingInformation,
      returnPolicy,
      images: images_url,
    });
    res.json({ success: true, message: "Product added successfully." });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({ success: false, message: "Provide an id for the product." });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.json({ success: false, message: "Product not found." });
      return;
    }

    res.json({ success: true, product });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const getProductByTitle = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { productName } = req.query;
    if (!productName || typeof productName !== "string") {
      res.json({
        success: false,
        message: "you must provide a title for the product.",
      });
      return;
    }

     const product = await Product.findOne({
      productName: { $regex: productName, $options: "i" },
    });

    res.json({ success: true, product });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({
        success: false,
        message: "You must provide an id for the product.",
      });
      return;
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.json({ success: false, message: "Product not found." });
      return;
    }
    res.json({ success: true, message: "Product deleted successfully." });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({
        success: false,
        message: "You must provide an id for the product.",
      });
      return;
    }
    const updateProductSchema = addProductSchema.partial();
    const data = updateProductSchema.parse(req.body);
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      res.json({ success: false, message: "Product not found." });
      return;
    }
    res.json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

export {
  addProduct,
  getAllProducts,
  getProductById,
  getProductByTitle,
  deleteProduct,
  updateProduct,
};
