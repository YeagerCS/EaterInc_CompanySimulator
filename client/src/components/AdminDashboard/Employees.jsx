import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useEmployees } from '../../contexts/DatabaseProvider';
import { formatCurrency } from '../../services/formatCurrency';

export default function Employees() {
    const { employees } = useEmployees()

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
                {employees && employees.map(employee => {
                    return(
                        <tr key={employee.id}>
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
        </div>
    )
}
