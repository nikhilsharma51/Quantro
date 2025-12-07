import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/authRoute.js";
import DBconnect from "./config/DBconfig.js";

configDotenv();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
DBconnect();

// allow credentials if using cookies from frontend (adjust origin)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);



// routes
app.use("/api/auth", authRoutes);


import { protect } from "./middlewares/authMiddleware.js";
app.get("/api/auth/me", protect, (req, res) => {
  res.json({ userId: req.user.userId });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});