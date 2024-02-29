import fs from "fs"
import BankAccount from "../models/bankAccount";
import Bank from "../models/bank";
import Employee from "../models/employee";
import { payLoanAsync, transferAmount } from "../controllers/transactionController";
import Loan from "../models/loan";

const salaryTransferInterval = 60 * 60 * 1000;//60 * 60 * 1000; //1h  <=> 1 month
const loanTransferInterval = 12 * 60 * 60 * 1000; //12 * 60 * 60 * 1000 //12h <=> 1 year
const timestampWriteInterval = 15 * 60 * 1000; //15 * 60 * 1000 //15min
const timeStampFile = "timestamp.cfg"


const readLastTransferTimestamp = () => {
    try{
        const timestamp = fs.readFileSync(timeStampFile, "utf-8")
        return parseInt(timestamp, 10) || 0;
    } catch(err){
        console.log(err);
        return 0;
    }
}

const writeTimestamp = (timestamp) => {
    fs.writeFileSync(timeStampFile, timestamp.toString())
}

const simulateTransfers = async () => {
    const lastTimeStamp = readLastTransferTimestamp();
    const currentTime = Date.now();

    let elapsedTime = currentTime - lastTimeStamp;
    const remainingTime = loanTransferInterval - (elapsedTime % loanTransferInterval);


    setTimeout(async () => {
        await compileSimulation();
        simulateTransfers();
    }, salaryTransferInterval)

    setTimeout(() => {
        const newTimestamp = Date.now()
        writeTimestamp(newTimestamp)
        simulateTransfers();

    }, timestampWriteInterval)

    setTimeout(async () => {
        await payLoan()
        elapsedTime = 0;
        simulateTransfers();
    }, remainingTime)
}

const payLoan = async () => {
    const admin = await BankAccount.findOne({
        where: {
            BankId: 1
        }
    })
    
    const loans = await Loan.findAll({
        where:{
            bankAccountId: admin.id
        }
    })

    const bank = await Bank.findOne({
        where: {
            id: 1
        }
    })

    const interest = bank.interest;

    if(loans.length > 0){
        // pay all loans
        loans.forEach(async loan => {
            const totalLoanAmount = loan.amount + (loan.amount * interest);
            await payLoanAsync(admin, bank, totalLoanAmount);
        })
    }
}

const calculatePayout = async (employee) => {
    const yearlySalary = employee.salary;
    const monthlySalary = yearlySalary / 12;

    return monthlySalary;
}


const compileSimulation = async () => {
    const employees = await Employee.findAll({
        include: {model: BankAccount, as: "BankAccount"}
    });

    for(const employee of employees){
        if(employee.BankAccount && employee.BankAccount.BankId != 1){
            const payout = await calculatePayout(employee)
            const bank = await Bank.findOne({
                where:{
                    id: employee.BankAccount.BankId
                }
            })

            const newBalance = (employee.BankAccount.balance + payout) + (payout * Math.pow(bank.interest, (1/12)))

            const admin = await BankAccount.findOne({
                where: {
                    BankId: 1
                }
            })

            await transferAmount(admin.reference, employee.BankAccount.reference, payout)


            const bankAccount = await BankAccount.findOne({
                where:{
                    id: employee.BankAccount.id
                }
            })

            await bankAccount.update({balance: newBalance})
        }
    }
}

export { simulateTransfers }