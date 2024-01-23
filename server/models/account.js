import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";
import Employee from "./employee";

const Account = sequelize.define("Account", {
    employeeNr: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    initialized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

Account.belongsTo(Employee)
Account.generateNewEmployeeNumber = async () => {
    const lastAccount = await Account.findOne({
        order: [['createdAt', 'DESC']]
    })

    if(lastAccount){
        const employeeNr = parseInt(lastAccount.employeeNr);

        return employeeNr + 1;
    } else{
        return 1001;
    }
}

export default Account;