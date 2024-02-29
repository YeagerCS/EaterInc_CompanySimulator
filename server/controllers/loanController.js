import BankAccount from "../models/bankAccount"
import Loan from "../models/loan"

const createLoan = async (bankId, target, amount) => { //target is the reference number of the Bank Account
    const bankAccount = await BankAccount.findOne({
        where:{
            reference: target
        }
    })

    const loan = await Loan.create({
        bank: bankId,
        target: target,
        amount: amount,
        date: new Date(),
        bankAccountId: bankAccount.id
    })

    await bankAccount.addLoan(loan)
}

const retrieveLoans = async (req, res) => {
    const loans = await Loan.findAll();
    res.json(loans)
}

export { createLoan, retrieveLoans }