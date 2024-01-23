import { v4 } from "uuid"

export default class Employee {
    constructor(){
        this.id = v4();
        this.firstname = ""
        this.lastname = ""
        this.email = ""
        this.job = ""
        this.salary = ""
    }

    toObject() {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            job: this.job,
            salary: this.salary
        };
    }
}