import React, { useEffect, useState } from 'react'
import EmployeeInformation from './EmployeeInformation'
import BankAccountInformation from './BankAccountInformation'
import { useAuth } from '../../contexts/AuthenticationProvider'
import Account from '../../models/Account'
import Header from '../../Headers/Header'

export default function EmployeeDashboard() {
  const [account, setAccount] = useState(new Account())
  const authContext = useAuth()

  useEffect(() => {
    async function fetchAccount(){
      const _account = await authContext.getAccountByJWT(authContext.jwt);
      setAccount(_account)
    }

    fetchAccount();
  }, [authContext])

  return (
    <>
      <Header/>
      <div className='main-div'>
        <EmployeeInformation account={account}/>
        <BankAccountInformation account={account}/>
      </div>
    </>
  )
}
