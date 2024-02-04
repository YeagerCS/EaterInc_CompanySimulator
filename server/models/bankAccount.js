import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";
import Bank from "./bank";
import Transaction from "./transaction";

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
    }
})

BankAccount.hasMany(Transaction, { foreignKey: "bankAccountId", as: "transactions" })

BankAccount.belongsTo(Bank)

export default BankAccount;