import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array, required: true },
    discount: { type: Number, required: true },
    brand: { type: String },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    availability: { type: Boolean, required: true },
    warranty: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    returnPolicy: { type: String, required: true },
  },
  { timestamps: true },
);

const Product = mongoose.model("product", productSchema);
export default Product;
