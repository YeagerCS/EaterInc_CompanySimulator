import React, { useEffect, useState } from 'react'
import { useLocalstorage } from '../../contexts/useLocalstorage';
import axios from 'axios';
import { GET_employees } from '../../apiroutes/routes';
import { useEmployees } from '../../contexts/DatabaseProvider';

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
                            <td>${employee.salary}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
