import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

// One review per order per user. Partial so older reviews saved before this
// schema (which have no `order` field) don't block the index from building.
reviewSchema.index(
  { order: 1, user: 1 },
  { unique: true, partialFilterExpression: { order: { $exists: true } } }
);

export default mongoose.model("Review", reviewSchema);
