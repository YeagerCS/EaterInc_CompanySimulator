import React from 'react'
import { formatCurrency } from '../../services/formatCurrency'

export default function BankTable({ banks, handleChooseBank }) {
  return (
    <div>
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Capital</th>
                        <th>Interest Rate</th>
                        <th>HQ</th>
                    </tr>
                </thead>
                <tbody>
                    {banks && banks.map(bank => {
                        return(
                            <>
                                {bank.BankId && 
                                    <tr onClick={() => handleChooseBank(bank)}>
                                        <td>{bank.name}</td>
                                        <td>{formatCurrency(bank.capital)}</td>
                                        <td>{bank.interest * 100}%</td>
                                        <td>{bank.hq}</td>
                                    </tr>
                                }
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
