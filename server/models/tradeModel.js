import { DataTypes } from "sequelize";
import sequelize from "../config/Postgres";

const Trade = sequelize.define("Trade", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },

  side: {
    type: DataTypes.ENUM("LONG", "SHORT"),
    allowNull: false,
  },

  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  entry: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false,
  },

  exit: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: true,
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

},
{
    indexes : [
        {fields : ["userId"]},
        {fields : ["symbol"]},
        {fields : ["userId", "date"]},
    ],
}
);

export default Trade;
