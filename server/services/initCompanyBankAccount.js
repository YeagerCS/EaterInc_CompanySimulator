import { v4 } from "uuid";
import BankAccount from "../models/bankAccount"

const initCompanyBankAccount = async () => {
    const bankAccountRows = await BankAccount.findAll();
    if(bankAccountRows.length === 0){
        const minBalance = 6 * (10 ** 6)
        const maxBalance = 17 * (10 ** 6)
        const companyBankAccount = await BankAccount.create({
            id: v4(),
            reference: v4(),
            balance: Math.floor(Math.random() * (maxBalance - minBalance)) + minBalance,
            transactionIds: [],
            BankId: 1
        });
    }
}

export default initCompanyBankAccount;