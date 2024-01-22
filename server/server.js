import express from "express"
import cors from "cors"
import sequelize from "./sequelize/sequelize"
import { GET_accounts, GET_employees, POST_employees } from "./api";
import { addEmployee, getEmployeeById, retrieveEmployees } from "./controllers/employeeController";
import { tryFunctionAsync } from "./utils/tryFunction";
import { getAccountById, retrieveAccounts } from "./controllers/accountController";

const app = express()
const PORT = 5000;

app.use(cors())
app.use(express.json())


sequelize.sync().then(() => {
    console.log("Db Synced");
})

//POST
app.post(POST_employees, async (req, res) => {
    await tryFunctionAsync(addEmployee, req, res)
})

//GET
app.get(GET_employees, async(req, res) => {
    await tryFunctionAsync(retrieveEmployees, req, res)
})

app.get(GET_accounts, async (req, res) => {
    const { id } = req.body;
    id ? await tryFunctionAsync(getEmployeeById, req, res) : await tryFunctionAsync(retrieveEmployees, req, res)
})


app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})