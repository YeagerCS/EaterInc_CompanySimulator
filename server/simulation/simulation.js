import fs from "fs"
import BankAccount from "../models/bankAccount";
import Bank from "../models/bank";
import Employee from "../models/employee";
import { transferAmount } from "../controllers/transactionController";
import Account from "../models/account";

const salaryTransferInterval = 3 * 60 * 1000;//2 * 60 * 60 * 1000; //2h in ms
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
    //const lastTimeStamp = readLastTransferTimestamp()
    //const currentTime = Date.now();
    //const elapsedTime = currentTime - lastTimeStamp;

    setTimeout(async () => {
        await compileSimulation();
        simulateTransfers();
    }, salaryTransferInterval)

    setTimeout(() => {
        const newTimestamp = Date.now()
        writeTimestamp(newTimestamp)
    }, 120 * 1000)
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
        if(employee.BankAccount){
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