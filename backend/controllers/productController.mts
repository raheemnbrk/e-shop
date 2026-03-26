import type { Request, Response } from "express";
import type { Multer } from "multer";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.mts";
import { z } from "zod";

const addProductSchema = z.object({
  productName: z.string().min(2),
  category: z.string().min(2),
  price: z.coerce.number().positive(),
  discount: z.coerce.number().min(0).max(100),
  description: z.string().min(10),
  stock: z.coerce.number().positive(),
  image: z.string().optional(),
});

const addProduct = async (
  req: Request & { file?: Express.Multer.File | undefined },
  res: Response,
): Promise<void> => {
  try {
    const { productName, category, price, discount, description, stock } =
      addProductSchema.parse(req.body);

    const image = req.file;
    if (!image) {
      res.status(400).json({ success: false, message: "Image is required" });
      return;
    }
    const imageUpload = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const image_url = imageUpload.secure_url;

    const newProduct = await Product.create({
      productName,
      category,
      price,
      discount,
      stock,
      description,
      image: image_url,
    });
    res.json({
      success: true,
      message: "Product added successfully.",
      newProduct,
    });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const title = (req.query.title as string) || "";

    let products;
    if (!title || title.trim() === "") products = await Product.find({});
    else
      products = await Product.find({
        $or: [{ productName: { $regex: title, $options: "i" } }],
      });

    res.json({ success: true, products });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req as any;
    if (!adminId) {
      res.json({ success: false, message: "not authorized" });
      return;
    }
    const { id } = req.body;
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
    res.json({
      success: true,
      message: "Product deleted successfully.",
      deletedProductId: product._id,
    });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const updateProduct = async (
  req: Request & { file?: Express.Multer.File },
  res: Response,
): Promise<void> => {
  try {
    const { adminId } = req as any;
    if (!adminId) {
      res.json({ success: false, message: "Not Authorized." });
      return;
    }

    const { id, ...rest } = req.body;
    if (!id) {
      res.json({
        success: false,
        message: "You must provide an id for the product.",
      });
      return;
    }

    const updateProductSchema = addProductSchema.partial();
    const data = updateProductSchema.parse(rest);

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      data.image = imageUpload.secure_url;
    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!product) {
      res.json({ success: false, message: "Product not found." });
      return;
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      updatedProduct: product,
    });
  } catch (err) {
    console.error((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

export { addProduct, getAllProducts, deleteProduct, updateProduct };
