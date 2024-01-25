import BankAccount from "../models/bankAccount"
import Employee from "../models/employee";

const retrieveBankAccounts = async (req, res) => {
    const account = await BankAccount.findAll();
    res.json(account);
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
        }
    })
    res.json({BankAccount: bankAccount})
}

export { retrieveBankAccounts, getBankAccountById }