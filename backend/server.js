import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js"; 

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL, // set this in Render to your Vercel URL
];

// normalize and filter empty values
const origins = allowedOrigins.filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (e.g., curl, Postman)
      if (!origin) return callback(null, true);

      // allow exact matches
      if (origins.includes(origin)) return callback(null, true);

      // allow all Vercel preview/production subdomains
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      return callback(null, false); // block others silently
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// handle preflight requests
app.options(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
