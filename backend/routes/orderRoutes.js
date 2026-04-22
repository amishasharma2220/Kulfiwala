import { protect } from "../middleware/authMiddleware.js";
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);
    console.log("USER:", req.user);
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { items, totalAmount, paymentMethod } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is required" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    // Ensure item structure matches schema
    const formattedItems = items.map((item) => ({
      name: item.name || item.title || "Item",
      price: item.price || 0,
      quantity: item.quantity || item.qty || 1,
    }));

    const newOrder = await Order.create({
      user: req.user._id,
      items: formattedItems,
      totalAmount,
      paymentMethod,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET USER'S ORDERS
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("FETCH ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;