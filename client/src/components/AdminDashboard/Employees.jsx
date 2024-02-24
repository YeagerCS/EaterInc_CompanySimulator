import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useEmployees } from '../../contexts/DatabaseProvider';
import { formatCurrency } from '../../services/formatCurrency';
import Modal from '../models/Modal';
import EditEmployee from '../EditEmployee/EditEmployee';

export default function Employees() {
    const { employees, setDbctxReload, dbctxReload } = useEmployees()
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(6)
    const [employeeView, setEmployeeView] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const handleNext = () => {
        setMin(employees.length < (min + 6) ? employees.length : min + 6);
        setMax(employees.length < (max + 6) ? employees.length : max + 6);
    }
      
    const handleBack = () => {
        setMin(employees.length > (min - 6) ? 0 : min - 6);
        setMax(employees.length > (max - 6) ? Math.min(employees.length, 6) : max - 6);
    }

    const handleSelectEmployee = async(employee) => {
        setSelectedEmployee(employee)
        setEmployeeView(true)
    }

    const closeModal = () => {
        setEmployeeView(false)
        setDbctxReload(!dbctxReload)
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Job Title</th>
                    <th>Salary (yearly)</th>
                </tr>
                </thead>
                <tbody>
                {employees && employees.slice(min, max).map(employee => {
                    return(
                        <tr key={employee.id} onClick={() => handleSelectEmployee(employee)}>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td>{employee.job}</td>
                            <td>{formatCurrency(employee.salary)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="paginator">
                <button id="form-button" className='form-input' onClick={handleBack} disabled={min === 0}>Back</button>
                <div className="paginator-text"><p>{ min + " - " + max + " of " + employees.length}</p></div>

                <button id="form-button" className='form-input' onClick={handleNext} disabled={max === employees.length}>Next</button>
            </div>
            <Modal isOpen={employeeView} onClose={() => setEmployeeView(false)}>
                <EditEmployee employee={selectedEmployee} onClose={closeModal}/>
            </Modal>
        </div>
    )
}
