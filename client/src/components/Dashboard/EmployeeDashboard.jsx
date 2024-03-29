import React, { useEffect, useState } from 'react'
import EmployeeInformation from './EmployeeInformation'
import BankAccountInformation from './BankAccountInformation'
import { LS_PREFIX, useAuth } from '../../contexts/AuthenticationProvider'
import Account from '../../models/Account'
import Header from '../../Headers/Header'
import { useNavigate } from 'react-router-dom'

export default function EmployeeDashboard() {
  const [account, setAccount] = useState(new Account())
  const authContext = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    async function fetchAccount(){
      const storedJwt = localStorage.getItem(LS_PREFIX + "jwt")
      if(!storedJwt){
        navigate("/login")
        return;
      }

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
