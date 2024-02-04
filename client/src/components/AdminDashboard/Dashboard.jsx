import React, { useEffect, useState } from 'react'
import Form from './Form'
import Employees from './Employees'
import { useLocalstorage } from '../../contexts/useLocalstorage'
import Header from '../../Headers/Header'
import { LS_PREFIX, useAuth } from '../../contexts/AuthenticationProvider'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [account, setAccount] = useState(null)
  const authContext = useAuth();  
  const navigate = useNavigate();

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
  }, [authContext.jwt, authContext.loading])

  return (
      <>
        <Header/>
        {account && account.employeeNr == 1000 ? 
          <>
            <div className="main-div">
              <Form></Form>
              <Employees ></Employees>
            </div>
          </>
          :
          <>
            <div className='nf-div'>
              <h1>You must be admin to access the Admin Dashboard</h1>
            </div>
          </>
        }
      </>
    )
}
