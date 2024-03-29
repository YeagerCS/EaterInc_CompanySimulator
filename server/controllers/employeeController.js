import Account from "../models/account";
import Employee from "../models/employee";
import { sendMail } from "../services/mailer";
import { generatePassword } from "../services/passwordGenerator";
import bcrypt from "bcrypt"
import handlebars from "handlebars";
import fs from "fs"
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import KeyEmployee from "../models/keyEmployee";


const addEmployee = async (req, res) => {
    const employee = await Employee.create(req.body);
    const employeeNr = await Account.generateNewEmployeeNumber();
    const employeePw = generatePassword()
    const employeePwHashed = await bcrypt.hash(employeePw, 10)

    sendMailToEmployee(employee.email, employeeNr, employeePw, (employee.firstname + " " + employee.lastname));

    const account = await Account.create({
        employeeNr: employeeNr,
        password: employeePwHashed,
        EmployeeId: employee.id
    })
    res.json({employee: employee, account: account})    
}

const addKeyEmployee = async(req, res) => {
    const { id, ceo } = req.body;
    const imageUri = req.file ? `/uploads/${req.file.filename}`: null;

    const keyEmployee = await KeyEmployee.create({
        image: imageUri,
        EmployeeId: id,
        ceo: ceo
    });

    res.json({keyEmployee})
}

const retrieveEmployees = async (req, res) => {
    const employees = await Employee.findAll();
    res.json(employees)
}   

const getEmployeeById = async (req, res) => {
    const { id } = req.body;
    const employee = await Employee.findAll({where: {
        id: id
    }})
    res.json(employee)
}

const sendMailToEmployee = (email, employeeNr, password, recipient) => {
    const html = initMailTemplate(recipient, employeeNr, password)

    const mailOptions = {
        from: "lejsdev@gmail.com",
        to: email,
        subject: "Your Employee Password",
        html: html
    };

    sendMail(mailOptions)
}

const initMailTemplate = (recipient, employeeNr, password) => {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    console.log(__dirname);
    const templatePath = path.join(__dirname, "../templates/mail-template.hbs")

    const templateSource = fs.readFileSync(templatePath, "utf-8")
    const template = handlebars.compile(templateSource)

    const dynamicData = {
        subject: 'Your Employee Password',
        recipient: recipient,
        employeeNr: employeeNr,
        password: password
    }

    return template(dynamicData)
}

const updateEmployee = async (req, res) => {
    const employeeData = req.body;
    console.log(employeeData);

    try{
        const [updateRowsCount, updatedEmployee] = await Employee.update(employeeData, {
            where: { id: employeeData.id }
        });

        if(updateRowsCount > 0){
            res.json({ code: 200, message: "Successfully updated"})
        } else {
            res.status(404).json({ success: false, message: 'Employee not found' });
        }
    } catch(err){
        console.log(err);
    }
}

const getKeyEmployees = async (req, res) => {
    const employees = await KeyEmployee.findAll({
        include: {model: Employee, as: "Employee"}
    });
    res.json(employees);
}


export { addEmployee, retrieveEmployees, getEmployeeById, updateEmployee, getKeyEmployees, addKeyEmployee }