import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { DELIVERY_FEE, MAX_QTY_PER_ITEM } from "../data/products.js";

const router = express.Router();

const PAYMENT_METHODS = ["card", "upi", "cod"];
const clean = (v) => (typeof v === "string" ? v.trim() : "");

// CREATE ORDER
// The client sends only product ids + quantities. Prices and totals are
// computed here from the database, so they can't be tampered with.
router.post("/", protect, async (req, res) => {
  try {
    const { items, paymentMethod, shippingAddress } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }
    if (!PAYMENT_METHODS.includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // Validate shipping address
    const addr = {
      fullName: clean(shippingAddress?.fullName),
      phone: clean(shippingAddress?.phone),
      line: clean(shippingAddress?.line),
      city: clean(shippingAddress?.city),
      state: clean(shippingAddress?.state),
      pincode: clean(shippingAddress?.pincode),
      notes: clean(shippingAddress?.notes).slice(0, 500),
    };
    if (!addr.fullName || !addr.phone || !addr.line || !addr.city || !addr.pincode) {
      return res.status(400).json({ message: "Complete shipping address is required" });
    }
    if (!/^\d{6}$/.test(addr.pincode)) {
      return res.status(400).json({ message: "Pincode must be 6 digits" });
    }

    // Merge duplicate lines and validate quantities
    const quantities = new Map();
    for (const item of items) {
      const sku = String(item?.productId ?? "");
      const qty = Number(item?.quantity);
      if (!sku || !Number.isInteger(qty) || qty < 1) {
        return res.status(400).json({ message: "Each item needs a productId and a whole-number quantity" });
      }
      quantities.set(sku, (quantities.get(sku) || 0) + qty);
    }
    for (const [, qty] of quantities) {
      if (qty > MAX_QTY_PER_ITEM) {
        return res.status(400).json({ message: `Maximum ${MAX_QTY_PER_ITEM} of each flavour per order` });
      }
    }

    // Look up real prices
    const skus = [...quantities.keys()];
    const products = await Product.find({ sku: { $in: skus }, isAvailable: true });
    if (products.length !== skus.length) {
      return res.status(400).json({ message: "One or more items are unavailable" });
    }

    const orderItems = products.map((p) => ({
      productId: p.sku,
      name: p.name,
      price: p.price,
      quantity: quantities.get(p.sku),
    }));
    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalAmount = subtotal + DELIVERY_FEE;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress: addr,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pay on delivery" : "Simulated",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: "Could not place order" });
  }
});

// GET USER'S ORDERS
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("FETCH ORDERS ERROR:", error);
    res.status(500).json({ message: "Could not fetch orders" });
  }
});

export default router;
