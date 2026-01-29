import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productsIds: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1, min: 1 },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "cancelled", "shipped"],
      required: true,
      default: "pending",
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: Number, required: true },
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paymentMethod: {
      type: String,
      required: true,
      default: "COD",
      enum: ["COD", "ONLINE"],
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("order", orderSchema);
export default Order;
