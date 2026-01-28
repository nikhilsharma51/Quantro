import express from "express";
import {
    getTrades,
    createTrade,
    updateTrade,
    deleteTrade,
    getTradeStats,
} from "../controllers/tradeController.js";
import protect from "../middlewares/authMiddleware.js";
import { validateTrades } from "../middlewares/validateTrades.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/").get(getTrades).post(validateTrades,createTrade);

router.route("/stats").get(getTradeStats);

router.route("/:id").put(validateTrades,updateTrade).delete(deleteTrade);

export default router;