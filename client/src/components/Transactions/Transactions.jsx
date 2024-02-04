import React, { useEffect, useState } from 'react'
import Header from '../../Headers/Header'
import TransactionForm from './TransactionForm'
import { LS_PREFIX, useAuth } from '../../contexts/AuthenticationProvider'
import { useEmployees } from '../../contexts/DatabaseProvider'
import TransactionTable from './TransactionTable'

export default function Transactions() {
  const [bankAccount, setBankAccount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const authContext = useAuth();
  const databaseContext = useEmployees();

  useEffect(() => {
    async function fetchAccount(){
      const storedJwt = localStorage.getItem(LS_PREFIX + "jwt")
      if(!storedJwt){
        navigate("/login")
        return;
      }

      const account = await authContext.getAccountByJWT(authContext.jwt);
      const _bankAccount = await databaseContext.getBankAccountById(account.employee.id)
      setBankAccount(_bankAccount)
      setTransactions(_bankAccount.transactions)
    }

    fetchAccount();
  }, [authContext])

  return (
    <>
      <Header/>
      <div className="main-div">
        <TransactionForm bankAccount={bankAccount}/>
        <TransactionTable transactions={transactions}/>
      </div>
    </>
  )
}
