import Trade from "../models/tradeModel.js";
import { Op } from "sequelize";

// @desc    Get all trades for logged-in user
// @route   GET /api/trades
// @access  Private
export const getTrades = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.user.id.toString(); // MongoDB ObjectId to string

        // Build where clause
        const whereClause = { userId };

        // Add date filter if provided
        if (startDate && endDate) {
            whereClause.date = {
                [Op.between]: [startDate, endDate],
            };
        } else if (startDate) {
            whereClause.date = {
                [Op.gte]: startDate,
            };
        } else if (endDate) {
            whereClause.date = {
                [Op.lte]: endDate,
            };
        }

        const trades = await Trade.findAll({
            where: whereClause,
            order: [["date", "DESC"]],
        });

        res.status(200).json({
            success: true,
            count: trades.length,
            data: trades,
        });
    } catch (error) {
        console.error("Error fetching trades:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch trades",
            error: error.message,
        });
    }
};

// @desc    Create new trade
// @route   POST /api/trades
// @access  Private
export const createTrade = async (req, res) => {
    try {
        const { symbol, side, qty, entry, exit, date } = req.body;
        const userId = req.user.id.toString();

        // Validation
        if (!symbol || !side || !qty || !entry || !date) {
            return res.status(400).json({
                success: false,
                message: "Please provide symbol, side, qty, entry, and date",
            });
        }

        const trade = await Trade.create({
            userId,
            symbol: symbol.toUpperCase(),
            side,
            qty: parseInt(qty),
            entry: parseFloat(entry),
            exit: exit ? parseFloat(exit) : null,
            date,
        });

        res.status(201).json({
            success: true,
            data: trade,
        });
    } catch (error) {
        console.error("Error creating trade:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create trade",
            error: error.message,
        });
    }
};

// @desc    Update trade
// @route   PUT /api/trades/:id
// @access  Private
export const updateTrade = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id.toString();
        const { symbol, side, qty, entry, exit, date } = req.body;

        // Find trade and verify ownership
        const trade = await Trade.findOne({
            where: { id, userId },
        });

        if (!trade) {
            return res.status(404).json({
                success: false,
                message: "Trade not found or unauthorized",
            });
        }

        // Update fields
        await trade.update({
            symbol: symbol ? symbol.toUpperCase() : trade.symbol,
            side: side || trade.side,
            qty: qty ? parseInt(qty) : trade.qty,
            entry: entry ? parseFloat(entry) : trade.entry,
            exit: exit !== undefined ? (exit ? parseFloat(exit) : null) : trade.exit,
            date: date || trade.date,
        });

        res.status(200).json({
            success: true,
            data: trade,
        });
    } catch (error) {
        console.error("Error updating trade:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update trade",
            error: error.message,
        });
    }
};

// @desc    Delete trade
// @route   DELETE /api/trades/:id
// @access  Private
export const deleteTrade = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id.toString();

        // Find and delete trade with ownership check
        const result = await Trade.destroy({
            where: { id, userId },
        });

        if (result === 0) {
            return res.status(404).json({
                success: false,
                message: "Trade not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Trade deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting trade:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete trade",
            error: error.message,
        });
    }
};

// @desc    Get trade statistics
// @route   GET /api/trades/stats
// @access  Private
export const getTradeStats = async (req, res) => {
    try {
        const userId = req.user.id.toString();
        const { startDate, endDate } = req.query;

        const whereClause = { userId, exit: { [Op.not]: null } };

        if (startDate && endDate) {
            whereClause.date = { [Op.between]: [startDate, endDate] };
        }

        const trades = await Trade.findAll({ where: whereClause });

        // Calculate stats
        const totalTrades = trades.length;
        const winningTrades = trades.filter(t => t.pnl > 0).length;
        const losingTrades = trades.filter(t => t.pnl < 0).length;
        const totalPnL = trades.reduce((sum, t) => sum + parseFloat(t.pnl), 0);
        const winRate = totalTrades > 0 ? ((winningTrades / totalTrades) * 100).toFixed(2) : 0;

        res.status(200).json({
            success: true,
            data: {
                totalTrades,
                winningTrades,
                losingTrades,
                totalPnL: totalPnL.toFixed(2),
                winRate,
            },
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch statistics",
            error: error.message,
        });
    }
};