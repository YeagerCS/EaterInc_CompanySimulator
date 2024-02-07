import express from "express"
import cors from "cors"
import sequelize from "./sequelize/sequelize"
import { GET_accounts, GET_bankAccount, GET_banks, GET_employees, GET_loans, GET_transactions, GET_verifyjwt, POST_bank, POST_employees, POST_loans, POST_login, POST_transaction, UPDATE_employee } from "./api";
import { addEmployee, getEmployeeById, retrieveEmployees, updateEmployee } from "./controllers/employeeController";
import { tryFunctionAsync } from "./utils/tryFunction";
import { getAccountById, retrieveAccounts, assignBankToAccount } from "./controllers/accountController";
import { login } from "./controllers/authController";
import { verifyToken } from "./services/jwtService";
import { getBankById, grantLoan, retrieveBanks } from "./controllers/bankController";
import { initBanks } from "./services/initBanks";
import { getBankAccountById, getBankAccountByName, getEmployeeByBankAccountReference, retrieveBankAccounts } from "./controllers/bankAccountController";
import initCompanyBankAccount from "./services/initCompanyBankAccount";
import initAdmin from "./services/initAdmin";
import { retrieveTransactions, transferAmountAsync } from "./controllers/transactionController";
import { simulateTransfers } from "./simulation/simulation";
import BankAccount from "./models/bankAccount";
import { retrieveLoans } from "./controllers/loanController";

const app = express()
const PORT = 5000;

app.use(cors())
app.use(express.json())


sequelize.sync().then(async () => {
    console.log("Db Synced");
    await initBanks();
    await initCompanyBankAccount();
    await initAdmin();
    await simulateTransfers();
})

//POST
app.post(POST_employees, async (req, res) => {
    await tryFunctionAsync(addEmployee, req, res)
})

app.post(UPDATE_employee, async(req, res) => {
    await tryFunctionAsync(updateEmployee, req, res)
})

app.post(POST_login, async (req, res) => {
    await tryFunctionAsync(login, req, res);
})

app.post(GET_verifyjwt, async (req, res) => {
    const { token } = req.body;
    await tryFunctionAsync(verifyToken, token, res)
})

app.post(GET_bankAccount, async(req, res) => {
    const { id } = req.body;
    id ? await tryFunctionAsync(getBankAccountById, req, res) :
    await tryFunctionAsync(retrieveBankAccounts, req, res)
})

app.post(POST_bank, async (req, res) => {
    await tryFunctionAsync(assignBankToAccount, req, res);
})

app.post(POST_transaction, async (req, res) => {
    await tryFunctionAsync(transferAmountAsync, req, res)    
})

app.post(POST_loans, async (req, res) => {
    await tryFunctionAsync(grantLoan, req, res)
})

app.post("/admin", async(req, res) => {
    const admin = await BankAccount.findOne({
        where:{
            BankId: 1
        }
    })

    await admin.update({ balance: 4.5267 * 10 ** 6})
})

//GET
app.get(GET_bankAccount + "/:reference", async(req, res) => {
    await tryFunctionAsync(getEmployeeByBankAccountReference, req, res)
})
app.get(GET_employees, async (req, res) => {
    const { id } = req.body;
    id ? await tryFunctionAsync(getEmployeeById, req, res) : 
    await tryFunctionAsync(retrieveEmployees, req, res)
})
app.get(GET_employees + "/:name", async (req, res) => {
    await tryFunctionAsync(getBankAccountByName, req, res)
})
app.get(GET_accounts, async (req, res) => {
    const { id } = req.body;
    id ? await tryFunctionAsync(getAccountById, req, res) : 
    await tryFunctionAsync(retrieveAccounts, req, res);
})
app.get(GET_banks, async (req, res) => {
    await tryFunctionAsync(retrieveBanks, req, res);
})
app.get(GET_banks + "/:id", async (req, res) => {
    await tryFunctionAsync(getBankById, req, res)
})
app.get(GET_transactions, async (req, res) => {
    await tryFunctionAsync(retrieveTransactions, req, res)
})
app.get(GET_loans, async(req, res) => {
    await tryFunctionAsync(retrieveLoans, req, res)
})
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})