import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/authRoute.js";
import tradeRoutes from "./routes/tradeRoute.js";
import DBconnect from "./config/DBconfig.js";
import { connectPostgres } from "./config/Postgres.js";

configDotenv();
const app = express();

// console.log("PG USER:", process.env.POSTGRES_USER);


// core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// allow credentials if using cookies from frontend (adjust origin)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

const startServer = async () => {
  try {
    await DBconnect();

    // Optional: Connect to PostgreSQL (comment out if not needed)
    try {
      await connectPostgres();
    } catch (pgError) {
      console.warn("⚠️  PostgreSQL not available, continuing without it");
    }

    // routes
    app.use("/api/auth", authRoutes);
    app.use("/api/trades", tradeRoutes);

    //health endpoint
    app.get("/api/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        mongodb: "Connected",
        postgres: "Connected",
      });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
