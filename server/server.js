import express from "express"
import cors from "cors"
import sequelize from "./sequelize/sequelize"
import { GET_accounts, GET_banks, GET_employees, GET_verifyjwt, POST_bank, POST_employees, POST_login } from "./api";
import { addEmployee, getEmployeeById, retrieveEmployees } from "./controllers/employeeController";
import { tryFunctionAsync } from "./utils/tryFunction";
import { getAccountById, retrieveAccounts, assignBankToAccount } from "./controllers/accountController";
import { login } from "./controllers/authController";
import { verifyToken } from "./services/jwtService";
import { retrieveBanks } from "./controllers/bankController";
import { initBanks } from "./services/initBanks";

const app = express()
const PORT = 5000;

app.use(cors())
app.use(express.json())


sequelize.sync().then(async () => {
    console.log("Db Synced");
    await initBanks();
})

//POST
app.post(POST_employees, async (req, res) => {
    await tryFunctionAsync(addEmployee, req, res)
})

app.post(POST_login, async (req, res) => {
    await tryFunctionAsync(login, req, res);
})

app.post(GET_verifyjwt, async (req, res) => {
    const { token } = req.body;
    await tryFunctionAsync(verifyToken, token, res)
})

app.post(POST_bank, async (req, res) => {
    await tryFunctionAsync(assignBankToAccount, req, res);
})

//GET
app.get(GET_employees, async (req, res) => {
    const { id } = req.body;
    id ? await tryFunctionAsync(getEmployeeById, req, res) : 
    await tryFunctionAsync(retrieveEmployees, req, res)
})
app.get(GET_accounts, async (req, res) => {
    const { id } = req.body;
    id ? await tryFunctionAsync(getAccountById, req, res) : 
    await tryFunctionAsync(retrieveAccounts, req, res);
})
app.get(GET_banks, async (req, res) => {
    await tryFunctionAsync(retrieveBanks, req, res);
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})