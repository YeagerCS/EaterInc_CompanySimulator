import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";
import BankAccount from "./bankAccount";

const Loan = sequelize.define("Loan", {
    bank: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    bankAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: BankAccount,
            key: "id"
        }
    }
})

export default Loan;