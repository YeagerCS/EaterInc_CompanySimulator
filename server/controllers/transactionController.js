import BankAccount from "../models/bankAccount"
import Transaction from "../models/transaction";

const transferAmountAsync = async(req, res) => {
    const { source, target, amount } = req.body;
    await transferAmount(source, target, amount)
    res.json("The amount of $" + amount + " was successfully transferred")
}

const transferAmount = async (source, target, amount) => {
    const sourceAccount = await BankAccount.findOne({
        where: {
            reference: source
        }
    })

    const targetAccount = await BankAccount.findOne({
        where:{
            reference: target
        }
    })


    const updatedSourceBalance = sourceAccount.balance - amount;

    if(updatedSourceBalance > 0){
        await sourceAccount.update({
            balance: updatedSourceBalance
        })

        await targetAccount.update({
            balance: targetAccount.balance + amount
        })
    }

    await createTransactions(source, target, amount, sourceAccount, targetAccount)
}

const createTransactions = async (source, target, amount, sourceAccount, targetAccount) => {
    const transaction1 = await Transaction.create({
        source: source,
        target: target,
        amount: -amount,
        date: new Date(),
        bankAccountId: sourceAccount.id
    })

    const transaction2 = await Transaction.create({
        source: source,
        target: target,
        amount: amount,
        date: new Date(),
        bankAccountId: targetAccount.id
    })

    await sourceAccount.addTransaction(transaction1)
    await targetAccount.addTransaction(transaction2)
}

const retrieveTransactions = async (req, res) => {
    const transactions = await Transaction.findAll()
    res.json(transactions)
}

export { transferAmount, retrieveTransactions, transferAmountAsync }