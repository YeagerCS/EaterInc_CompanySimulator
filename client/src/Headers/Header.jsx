import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { LS_PREFIX, useAuth } from '../contexts/AuthenticationProvider'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const authContext = useAuth();
  const navigate = useNavigate()
  const [account, setAccount] = useState(null)

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

  const handleLogout = () => {
    authContext.handleLogout();
    authContext.setAuthctxReload(!authContext.authctxReload);
    if(!authContext.loading) navigate("/")
  }

  

  return (
    <header>
        <nav>
            <Logo/>
            <button className='form-input' id="form-button" onClick={handleLogout}>Logout</button>
            <button className='form-input' id="form-button" onClick={() => navigate("/login")}>New Login</button>
            <button className='form-input' id="form-button" onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button className='form-input' id="form-button" onClick={() => navigate("/admin")}>Admin</button>
            {account && account.employeeNr == 1000 && <button className='form-input' id="form-button" onClick={() => navigate("/loans")}>Loans</button>}
            <button className='form-input' id="form-button" onClick={() => navigate("/transactions")}>Transactions</button>
            <button className='form-input' id="form-button" onClick={() => navigate("/aboutus")}>About Us</button>
        </nav>
    </header>
  )
}