import React, { useState } from 'react'
import NumericInput from '../SupportComponents/NumericInput'
import { useLocalstorage } from '../../contexts/useLocalstorage'
import Employee from '../../models/Employee'
import { useEmployees } from '../../contexts/DatabaseProvider'

export default function Form() {
    const [employee, setEmployee] = useState(new Employee())
    const { addEmployee } = useEmployees();

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(Object.values(employee).every(value => value)){
            addEmployee(employee);
            setEmployee(new Employee())
        }
    }

    return (
        <div className='form-div'>
            <form className='form' onSubmit={handleSubmit}>
                <h1>Add Employee</h1>
                <div className='form-group'>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name='firstname' className='form-input' value={employee.firstname} onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" name='lastname' className='form-input' value={employee.lastname} onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' className='form-input' value={employee.email} onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="job">Job Title Name</label>
                    <input type="text" name='job' className='form-input' value={employee.job} onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="salary">Salary</label>
                    <input type="text" name='salary' className='form-input' value={employee.salary} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="submit" className='form-input' value="Submit" id='form-button'/>
                </div>
            </form>
        </div>
    )
}
