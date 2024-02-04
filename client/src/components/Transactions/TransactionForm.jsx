import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GET_employees } from '../../apiroutes/routes'
import { formatCurrency } from '../../services/formatCurrency'

export default function TransactionForm({ bankAccount }) {
  const [reference, setReference] = useState("")
  const [matches, setMatches] = useState([])

  useEffect(() => {
  }, [])

  const handleReferenceInput = async (e) => {
    await fetchEmployees(e.target.value)
  }

  const fetchEmployees = async (name) => {
    const response = await axios.get(GET_employees + "/" + name)
    setMatches(response.data.employees ?? [])
  }

  const handleSubmit = () => {

  } 
  
  const handleSelectEmployee = (employee) => {
    if(employee.BankAccount.reference === bankAccount.reference){
        return; //TODO: Create dialog
    }
    setReference(employee.BankAccount.reference)
    setMatches([])
  }

  return (
    <div className='form-div'>
        <form className='form' onSubmit={handleSubmit}>
            <h1>Complete Transaction</h1>
            <div className='form-group'>
                <label htmlFor="balance">Balance</label>
                <input type="text" name='balance' className='form-input' disabled value={bankAccount && formatCurrency(bankAccount.balance)}/>
            </div>
            <div className='form-group'>
                <label htmlFor="reference">Target Reference</label>
                <input type="text" name='reference' className='form-input' value={reference} onKeyUp={handleReferenceInput} onChange={(e) => setReference(e.target.value)}
                    placeholder='Enter first- or lastname'
                />
                {matches.length > 0 && (
                    <div className="dropdown">
                        <div>
                            {matches.map((employee) => (
                                <li key={employee.id} className='dropdown-li' onClick={() => handleSelectEmployee(employee)}>
                                    <div className='dropdown-div'>
                                        <div>{employee.firstname} {employee.lastname}</div>
                                        <div><small>{employee.BankAccount.reference}</small></div>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='form-group'>
                <label htmlFor="amount">Amount</label>
                <input type="text" name='amount' className='form-input'/>
            </div>
            <div className="form-group">
                <input type="submit" className='form-input' value="Submit" id='form-button'/>
            </div>
        </form>
    </div>
  )
}
