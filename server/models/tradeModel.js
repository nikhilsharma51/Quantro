import { DataTypes } from "sequelize";
import { sequelize } from "../config/Postgres.js";

const Trade = sequelize.define(
  "Trade",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(24), // MongoDB ObjectId as string
      allowNull: false,
      field: "user_id", // snake_case in DB
    },
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    side: {
      type: DataTypes.ENUM("LONG", "SHORT"),
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    entry: {
      type: DataTypes.DECIMAL(16, 6),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    exit: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // Virtual fields for calculations
    entryTotal: {
      type: DataTypes.VIRTUAL,
      get() {
        return parseFloat(this.entry) * this.qty;
      },
    },
    exitTotal: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.exit) return null;
        return parseFloat(this.exit) * this.qty;
      },
    },
    pnl: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.exit) return null;
        const exitTotal = this.exitTotal;
        const entryTotal = this.entryTotal;
        return this.side === "LONG"
          ? exitTotal - entryTotal
          : entryTotal - exitTotal;
      },
    },
    returnPercent: {
      type: DataTypes.VIRTUAL,
      get() {
        const pnl = this.pnl;
        if (pnl === null) return null;
        return ((pnl / this.entryTotal) * 100).toFixed(2);
      },
    },
  },
  {
    tableName: "trades",
    timestamps: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["symbol"] },
      { fields: ["user_id", "date"] },
      { fields: ["date"] },
    ],

    defaultScope: {
      attributes: {
        include: ["entryTotal", "exitTotal", "pnl", "returnPercent"],
      },
    },
  },
);

export default Trade;
