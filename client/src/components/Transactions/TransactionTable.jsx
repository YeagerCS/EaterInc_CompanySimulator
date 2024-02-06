import React, { useState } from 'react'
import { formatCurrency } from '../../services/formatCurrency'
import { formatDate } from '../../services/formatDate'
import Modal from '../models/Modal'
import axios from 'axios'
import { GET_bankAccount } from '../../apiroutes/routes'

export default function TransactionTable({ transactions }) {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(6)
  const [viewUser, setViewUser] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState({})
  const [viewingReference, setViewingReference] = useState("")

  const handleNext = (e) => {
    e.preventDefault();
    setMin(transactions.length < (min + 6) ? transactions.length : min + 6);
    setMax(transactions.length < (max + 6) ? transactions.length : max + 6);
  }
    
  const handleBack = (e) => {
    e.preventDefault();
    setMin(transactions.length < (min - 6) ? 0 : min - 6);
    setMax(transactions.length < (max - 6) ? Math.min(transactions.length, 6) : max - 6);
  }
  
  const handleSelectReference = async (reference) => {
    try{
      setViewingReference(reference)
      const response = await axios.get(GET_bankAccount + "/" + reference);
      setSelectedEmployee(response.data)
      setViewUser(true)
    } catch(err){
      console.log(err);
    }
  } 

  return (
    <>
      <Modal isOpen={viewUser} onClose={() => setViewUser(false)}>
        <div className='form-div'>
          <form className='form'>
              <h1>Employee Information</h1>
              <div className='form-group'>
                  <label htmlFor="reference">Reference</label>
                  <input type="text" name='reference' className='form-input' value={viewingReference} disabled/>
              </div>
              <div className='form-group'>
                  <label htmlFor="name">Name</label>
                  <input type="text" name='name' className='form-input' value={selectedEmployee.firstname + " " + selectedEmployee.lastname} disabled/>
              </div>
              <div className='form-group'>
                  <label htmlFor="email">Email</label>
                  <input type="text" name='email' className='form-input' value={selectedEmployee.email} disabled/>
              </div>
              <div className='form-group'>
                  <label htmlFor="job">Job Title</label>
                  <input type="text" name='job' className='form-input' value={selectedEmployee.job} disabled/>
              </div>
          </form>
        </div>
      </Modal>
      <div className="table-container">
        <table className="table">
            <thead>
            <tr>
                <th>Source</th>
                <th>Target</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {transactions && transactions.slice(min, max).map(transaction => {
                return(
                    <tr key={transaction.id}>
                        <td id='td-ref' onClick={() => handleSelectReference(transaction.source)}>{transaction.source}</td>
                        <td id='td-ref' onClick={() => handleSelectReference(transaction.target)}>{transaction.target}</td>
                        <td>{formatCurrency(transaction.amount)}</td>
                        <td>{formatDate(transaction.date)}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        <div className="paginator">
                <button id="form-button" className='form-input' onClick={handleBack} disabled={min === 0}>Back</button>
                <div className="paginator-text"><p>{ min + " - " + Math.min(max, transactions.length) + " of " + transactions.length}</p></div>

                <button id="form-button" className='form-input' onClick={handleNext} disabled={max === transactions.length}>Next</button>
        </div>
      </div>
    </>
  )
}
