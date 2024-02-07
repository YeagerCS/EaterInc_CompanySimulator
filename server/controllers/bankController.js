import Bank from "../models/bank"
import BankAccount from "../models/bankAccount";
import { createLoan } from "./loanController";

const retrieveBanks = async (req, res) => {
    const bank = await Bank.findAll();
    res.json(bank)
}

const getBankById = async(req, res) => {
    const id = req.params.id;
    const bank = await Bank.findOne({
        where:{
            id: id
        }
    })
    res.json(bank)
}

const grantLoan = async(req, res) => {
    const { bankId, target, amount } = req.body;
    await transferLoan(bankId, target, amount, res)
}

const transferLoan = async (bankId, targetReference, amount, res) => {
    const bank = await Bank.findOne({
        where: {
            id: bankId
        }
    })
    const targetAccount = await BankAccount.findOne({
        where: {
            reference: targetReference
        }
    })

    await bank.update({capital: bank.capital - amount})
    await targetAccount.update({balance: targetAccount.balance + amount})
    await createLoan(bankId, targetReference, amount)

    res.json(bank.name + " successfully granted you a loan for $" + amount)
}

export { retrieveBanks, getBankById, grantLoan }