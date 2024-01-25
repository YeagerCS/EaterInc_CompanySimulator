import React from 'react'
import Logo from './Logo'
import { useAuth } from '../contexts/AuthenticationProvider'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const authContext = useAuth();
  const navigate = useNavigate()

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
        </nav>
    </header>
  )
}
