import { Op } from "sequelize";
import BankAccount from "../models/bankAccount"
import Employee from "../models/employee";
import Transaction from "../models/transaction";

const retrieveBankAccounts = async (req, res) => {
    const account = await BankAccount.findAll();
    res.json(account);
}

const getBankAccountByName = async (req, res) => {
    const name = req.params.name;
    const employees = await Employee.findAll({
        where:{
            [Op.or]: [
                {
                    firstname: {
                        [Op.like]: `%${name}%`
                    }
                },
                {
                    lastname: {
                        [Op.like]: `%${name}%`
                    }
                }
            ]
        },
        include: {model: BankAccount, as: "BankAccount"}
    })
    res.json({employees: employees})
}

const getEmployeeByBankAccountReference = async (req, res) => {
    const reference = req.params.reference;
    const employee = await Employee.findOne({
        include: {model: BankAccount, as: "BankAccount", where: {
            reference: reference
        }}
    })

    if(employee){
        res.json(employee)
    } else{
        res.status(404).json("No employee with the reference " + reference + " was found.")
    }
}

const getBankAccountById = async(req, res) => {
    const { id } = req.body;
    const employee = await Employee.findOne({
        where: {
            id: id
        }
    })
    const bankAccount = await BankAccount.findOne({
        where: {
            id: employee.BankAccountId
        },
        include: {model: Transaction, as: "transactions"}
    })
    res.json({BankAccount: bankAccount})
}

export { retrieveBankAccounts, getBankAccountById, getBankAccountByName, getEmployeeByBankAccountReference}