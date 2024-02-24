import React, { useEffect, useState } from 'react'
import Employee from '../../models/Employee'
import axios from 'axios';
import { UPDATE_employee } from '../../apiroutes/routes';
import KeyEmployeeForm from './KeyEmployeeForm';

export default function EditEmployee({ employee, onClose }) {
  const [updatedEmployee, setUpdatedEmployee] = useState(employee ?? new Employee())
  
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setUpdatedEmployee(prev => ({
        ...prev,
        [name]: value
    }))
  }

  useEffect(() => {
    console.log(employee);
    setUpdatedEmployee(employee)
  }, [employee])

  const handleSubmit = async(e) => {
    try{
        e.preventDefault();
        const response = await axios.post(UPDATE_employee, updatedEmployee)
        console.log(response);
        onClose();
    } catch(error){
        console.log(error);
    }
  }

  if(updatedEmployee){
    return (
        <div className='edit-modal'>
          <form className='form' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="firstname">First Name</label>
                <input type="text" name='firstname' className='form-input' value={updatedEmployee.firstname} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor="lastname">Last Name</label>
                <input type="text" name='lastname' className='form-input' value={updatedEmployee.lastname} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor="email">Email</label>
                <input type="text" name='email' className='form-input' value={updatedEmployee.email} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor="job">Job Title Name</label>
                <input type="text" name='job' className='form-input' value={updatedEmployee.job} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor="salary">Salary</label>
                <input type="text" name='salary' className='form-input' value={updatedEmployee.salary} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <input type="submit" className='form-input' value="Update" id='form-button'/>
            </div>
          </form>
          <div>
            <KeyEmployeeForm id={employee && employee.id} ceo={Number(employee && employee.salary) == 0} onClose={onClose}/>
          </div>
        </div>
    )
  }

  return (
    <div></div>
  )
}
