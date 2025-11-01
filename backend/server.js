import express from "express";
import connectDB from "./config/mongodbConfig.js";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routers/uploadProjectRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Database connection
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dynamic CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://dilip-portfolio.onrender.com", // your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// API routes
app.use("/", uploadRoutes);

// Simple health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
