import jwt from "jsonwebtoken"
import Employee from "../models/employee"
const SECRET = "THE_EAT_ENJOYER_PIZZA_DOENER"

const generateToken = (account) => {
    const payload = {
        employeeId: account.EmployeeId,
        accountId: account.id,
        employeeNr: account.employeeNr
    }

    const token = jwt.sign(payload, SECRET, {expiresIn: '72h'})

    return token;
}

const verifyToken = async (token, res) => {
    console.log(token);
    jwt.verify(token, SECRET, async (err, decoded) => {
        if(err){
            res.json({code: 400, message: "Token is invalid or expired"})
        } else{
            const employeeId = decoded.employeeId;
            const employeeNr = decoded.employeeNr;
            const employee = await Employee.findOne({
                where: {
                    id: employeeId
                }
            })

            res.json({code: 200, message: "success", employee: employee, employeeNr: employeeNr, token: token});
        }
    })
}

export { generateToken, verifyToken }