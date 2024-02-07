const http = "http://"
const host = "localhost:5000"

const uri = http + host;
export const POST_employees = uri + "/api/addEmployee"
export const GET_employees = uri + "/api/employees"
export const POST_login = uri + "/login"
export const GET_verifyjwt = uri + "/api/jwt"
export const GET_banks = uri + "/api/banks"
export const POST_bank = uri + "/api/account/bank"
export const GET_bankAccount = uri + "/api/bankAccount";
export const POST_transaction = uri + "/api/transfer"
export const POST_loans = uri + "/api/loan"
export const UPDATE_employee = uri + "/api/update/employee"
