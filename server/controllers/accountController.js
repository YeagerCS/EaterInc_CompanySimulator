import { v4 } from "uuid";
import Account from "../models/account"
import BankAccount from "../models/bankAccount";
import Employee from "../models/employee";
import { verifyToken } from "../services/jwtService";
import { transferAmount } from "./transactionController";

const retrieveAccounts = async (req, res) => {
    const accounts = await Account.findAll();
    res.json(accounts)
}

const getAccountById = async (req, res) => {
    const {id} = req.body;
    const account = await Account.findAll({where: {
        id: id
    }})
    res.json(account)
}

const assignBankToAccount = async (req, res) => {
    const { bank, id } = req.body;
    const employee = await Employee.findOne({
        where:{
            id: id
        }
    })
    const initialBalance = parseInt(employee.salary)

    const bankAccount = await BankAccount.create({
        id: v4(),
        reference: v4(),
        balance: (initialBalance * bank.interest),
        BankId: bank.id,
        transactionIds: []
    })

    const companyBankAccount = await BankAccount.findOne({
        where:{
            BankId: 1
        }
    })

    await transferAmount(companyBankAccount.reference, bankAccount.reference, initialBalance)

    await employee.update({ BankAccountId: bankAccount.id })
    res.status(200).json({message: "Successfully Assigned Bank", bankAccount: bankAccount})
}

export {retrieveAccounts, getAccountById, assignBankToAccount}