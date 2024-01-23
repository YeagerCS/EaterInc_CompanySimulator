import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthenticationProvider'
import Account from '../../models/Account.ts'
import { formatCurrency } from '../../services/formatCurrency.jsx'

export default function EmployeeInformation() {
    const authContext = useAuth()
    const [account, setAccount] = useState(new Account())

    useEffect(() => {
        async function fetchAccount(){
            const _account = await authContext.getAccountByJWT(authContext.jwt);
            setAccount(_account)
        }   

        fetchAccount()
    }, [authContext])

    return (
        <div className='form-div'>
            {account.employee && 
                <form className='form'>
                    <h1>{account.employee.firstname} {account.employee.lastname}</h1>
                    <div className='form-group'>
                        <label htmlFor="employeeNr">Employee Number</label>
                        <input type="text" name='employeeNr' className='form-input' value={account.employeeNr} disabled/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' className='form-input' value={account.employee.email} disabled/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="job">Job Title Name</label>
                        <input type="text" name='job' className='form-input' value={account.employee.job} disabled/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="salary">Salary (yearly)</label>
                        <input type="text" name='salary' className='form-input' value={formatCurrency(account.employee.salary)} disabled/>
                    </div>
                </form>
            }
        </div>
    )
}
