import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.mts";

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
    } = req.body;

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
    if (products.length === 0) {
      res.json({ success: false, message: "Error fetching products!" });
      return;
    }
    res.json({ success: true, products });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};



export { addProduct, getAllProducts };
