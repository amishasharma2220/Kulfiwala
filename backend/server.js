import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Exact origins allowed to call the API. FRONTEND_URL can hold several
// comma-separated URLs (e.g. production + a custom domain).
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://kulfiwala-seven.vercel.app",
  ...(process.env.FRONTEND_URL || "").split(",").map((s) => s.trim()),
].filter(Boolean);

// Vercel preview deployments of THIS project only (not every *.vercel.app site)
const vercelPreview = /^https:\/\/kulfiwala[a-z0-9-]*\.vercel\.app$/;

app.use(
  cors({
    origin(origin, callback) {
      // allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || vercelPreview.test(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "100kb" }));

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Malformed JSON and any other unhandled errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON body" });
  }
  console.error("UNHANDLED ERROR:", err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
