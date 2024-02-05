import React, { useState } from 'react'
import { formatCurrency } from '../../services/formatCurrency'
import { formatDate } from '../../services/formatDate'

export default function TransactionTable({ transactions }) {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(6)

  const handleNext = () => {
    setMin(transactions.length < (min + 6) ? transactions.length : min + 6);
    setMax(transactions.length < (max + 6) ? transactions.length : max + 6);
  }
    
  const handleBack = () => {
    setMin(transactions.length > (min - 6) ? 0 : min - 6);
    setMax(transactions.length > (max - 6) ? Math.min(transactions.length, 6) : max - 6);
  }

  return (
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
                        <td>{transaction.source}</td>
                        <td>{transaction.target}</td>
                        <td>{formatCurrency(transaction.amount)}</td>
                        <td>{formatDate(transaction.date)}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        <div className="paginator">
                <button id="form-button" className='form-input' onClick={handleBack} disabled={min === 0}>Back</button>
                <div className="paginator-text"><p>{ min + " - " + max + " of " + transactions.length}</p></div>

                <button id="form-button" className='form-input' onClick={handleNext} disabled={max === transactions.length}>Next</button>
        </div>
    </div>
  )
}
