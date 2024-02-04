import React from 'react'
import { formatCurrency } from '../../services/formatCurrency'
import { formatDate } from '../../services/formatDate'

export default function TransactionTable({ transactions }) {
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
            {transactions && transactions.map(transaction => {
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
    </div>
  )
}
