import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("database connected.");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (err) {
    console.log((err as Error).message);
  }
};
