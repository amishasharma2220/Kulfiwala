import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  orderId: String,
  rating: Number,
  review: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);