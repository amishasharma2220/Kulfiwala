import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    const fields = [name, email, message];

    if (fields.some((f) => typeof f !== "string" || !f.trim())) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return res.status(400).json({ message: "Message is too long" });
    }

    const newMessage = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ message: "Could not send message" });
  }
});

export default router;
