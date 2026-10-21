import express from "express";
import mongoose from "mongoose";
import { protect } from "../middleware/authMiddleware.js";
import Review from "../models/Review.js";
import Order from "../models/Order.js";

const router = express.Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET the current user's review for an order (null if not reviewed yet)
router.get("/order/:orderId", protect, async (req, res) => {
  try {
    if (!isValidId(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid order id" });
    }
    const review = await Review.findOne({ order: req.params.orderId, user: req.user._id });
    res.json(review);
  } catch (error) {
    console.error("FETCH REVIEW ERROR:", error);
    res.status(500).json({ message: "Could not fetch review" });
  }
});

// CREATE a review — only for the user's own orders, once per order
router.post("/", protect, async (req, res) => {
  try {
    const { orderId, rating, review } = req.body || {};
    const stars = Number(rating);
    const text = typeof review === "string" ? review.trim() : "";

    if (!orderId || !isValidId(orderId)) {
      return res.status(400).json({ message: "Invalid order id" });
    }
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return res.status(400).json({ message: "Rating must be a whole number from 1 to 5" });
    }
    if (text.length < 5 || text.length > 1000) {
      return res.status(400).json({ message: "Review must be 5–1000 characters" });
    }

    const order = await Order.findOne({ _id: orderId, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const existing = await Review.findOne({ order: order._id, user: req.user._id });
    if (existing) {
      return res.status(409).json({ message: "You have already reviewed this order" });
    }

    const newReview = await Review.create({
      order: order._id,
      user: req.user._id,
      rating: stars,
      review: text,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);
    res.status(500).json({ message: "Could not save review" });
  }
});

export default router;
