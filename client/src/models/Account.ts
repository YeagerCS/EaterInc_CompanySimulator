import Employee from "./Employee";

export default class Account {
    employee: Employee
    employeeNr: number
    token: string

    constructor(employee: Employee, employeeNr: number, token: string){
        this.employee = employee;
        this.employeeNr = employeeNr
        this.token = token
    }
}