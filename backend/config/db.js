import mongoose from "mongoose";
import seedProducts from "../utils/seedProducts.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    await seedProducts();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
