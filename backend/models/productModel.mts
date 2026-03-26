import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    discount: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true },
);

const Product = mongoose.model("product", productSchema);
export default Product;
