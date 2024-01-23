import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";

const Bank = sequelize.define("Bank", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capital: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    interest: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hq: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Bank.belongsTo(Bank, {
    allowNull: true
}) //auf recursive angelehnt

export default Bank;