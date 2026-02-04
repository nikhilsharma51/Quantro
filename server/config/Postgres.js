import { Sequelize } from "sequelize";

const POSTGRES_URI =
  "postgres://postgres:Ns%40721764@localhost:5432/trading_dashboard";

export const sequelize = new Sequelize(POSTGRES_URI, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: false,
  },
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
});

console.log("Using PostgreSQL URI connection");

export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connection has been established successfully.");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("✅ All models were synchronized successfully.");
    }
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error.message);
    process.exit(1);
  }
};
