import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// IMPORTANT: route is "/"
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { orderId, rating, review } = req.body;

    if (!orderId || !rating || !review) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newReview = await Review.create({
      orderId,
      rating,
      review,
    });

    res.status(201).json(newReview);

  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;