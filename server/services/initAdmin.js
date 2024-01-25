import { v4 } from "uuid"
import Account from "../models/account"
import Employee from "../models/employee"
import bcrypt from "bcrypt"
import BankAccount from "../models/bankAccount"

const initAdmin = async () => {
    const bankAccount = await BankAccount.findOne();


    const admin = await Employee.create({
        id: v4(),
        firstname: "the",
        lastname: "admin",
        email: "lejsdev@gmail.com",
        job: "CEO",
        salary: 0,
        BankAccountId: bankAccount.id
    })
    const employeePw = "the"
    const employeePwHashed = await bcrypt.hash(employeePw, 10)


    const adminAccount = await Account.create({
        employeeNr: 1000,
        password: employeePwHashed,
        EmployeeId: admin.id
    })
}

export default initAdmin;