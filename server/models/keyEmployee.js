import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";
import Employee from "./employee";

const KeyEmployee = sequelize.define("KeyEmployee", {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ceo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

KeyEmployee.belongsTo(Employee)
export default KeyEmployee;