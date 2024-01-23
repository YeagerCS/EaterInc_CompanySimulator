import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";
import BankAccount from "./bankAccount";

const Employee = sequelize.define("Employee", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    job:{
        type: DataTypes.STRING,
        allowNull: false
    },
    salary:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
})

Employee.belongsTo(BankAccount)

export default Employee;