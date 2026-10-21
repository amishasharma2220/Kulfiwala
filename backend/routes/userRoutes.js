import express from "express";
import User from "../models/Users.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET current user's full profile
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

// UPDATE name/phone
router.put("/me", protect, async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    await user.save();
    res.json({ name: user.name, phone: user.phone });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD a new address
router.post("/me/addresses", protect, async (req, res) => {
  try {
    const { label, line, city, state, pincode, isDefault } = req.body;
    if (!line || !city) {
      return res.status(400).json({ message: "Address line and city are required" });
    }
    const user = await User.findById(req.user._id);

    if (isDefault || user.addresses.length === 0) {
      user.addresses.forEach((a) => (a.isDefault = false));
    }

    user.addresses.push({
      label: label || "Home",
      line,
      city,
      state: state || "",
      pincode: pincode || "",
      isDefault: isDefault || user.addresses.length === 0,
    });

    await user.save();
    res.status(201).json(user.addresses);
  } catch (error) {
    console.error("ADD ADDRESS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// EDIT an address
router.put("/me/addresses/:addressId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    const { label, line, city, state, pincode, isDefault } = req.body;
    if (label !== undefined) address.label = label;
    if (line !== undefined) address.line = line;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pincode !== undefined) address.pincode = pincode;

    if (isDefault) {
      user.addresses.forEach((a) => (a.isDefault = false));
      address.isDefault = true;
    }

    await user.save();
    res.json(user.addresses);
  } catch (error) {
    console.error("EDIT ADDRESS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE an address
router.delete("/me/addresses/:addressId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    const wasDefault = address.isDefault;
    address.deleteOne();

    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    res.json(user.addresses);
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;