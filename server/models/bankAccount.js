import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";
import Bank from "./bank";

const BankAccount = sequelize.define("BankAccount", {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    transactions: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
    }
})

BankAccount.belongsTo(Bank)

export default BankAccount;