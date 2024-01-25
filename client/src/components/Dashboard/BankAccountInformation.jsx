import React, { useEffect, useState } from 'react'
import { useEmployees } from '../../contexts/DatabaseProvider'
import { useAuth } from '../../contexts/AuthenticationProvider'
import Account from '../../models/Account'
import { formatCurrency } from '../../services/formatCurrency'

export default function BankAccountInformation({ account }) {
    const [bankAccount, setBankAccount] = useState(null)
    const [bank, setBank] = useState(null);
    const employeeContext = useEmployees();

    useEffect(() => {
        async function fetchData() {
            if(account.employee){
                const _bankAccount = await employeeContext.getBankAccountById(account.employee.id)
                const bank = await employeeContext.getBankById(_bankAccount.BankId);
                setBank(bank)
                setBankAccount(_bankAccount)
            }
        }

        fetchData()
    }, [account, employeeContext])


    return (
        <div className='form-div'>
            {bankAccount && 
                <form className='form'>
                    <h1>Bank account at {bank.name}</h1>
                    <div className='form-group'>
                        <label htmlFor="reference">Reference Number</label>
                        <input type="text" name='reference' className='form-input' disabled value={bankAccount.reference}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="balance">Account Balance</label>
                        <input type="text" name='balance' className='form-input' disabled value={formatCurrency(bankAccount.balance)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="job">Yearly Interest Rate</label>
                        <input type="text" name='job' className='form-input' disabled value={bank.interest * 100 + "%"}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="salary">Transactions</label>
                        <input type="text" name='salary' className='form-input'disabled/>
                    </div>
                </form>
            }
        </div>
    )
}
