import axios from 'axios';
import React, { useState } from 'react'
import { POST_login } from '../../apiroutes/routes';
import { useAuth } from '../../contexts/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [employeeNr, setEmployeeNr] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const authContext = useAuth()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstInit = await authContext.handleLogin(employeeNr, password)
    if(firstInit){
      navigate("/initBank")
    }
    setEmployeeNr("")
    setPassword("")
    navigate("/dashboard")
  }

  return (
    <div className="main-div">
      <div className='form-div'>
          <form className='form' onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className='form-group'>
                  <label htmlFor="employeeNr">Employee Number</label>
                  <input type="text" name='employeeNr' className='form-input' value={employeeNr} onChange={(e) => setEmployeeNr(e.target.value)}/>
              </div>
              <div className='form-group'>
                  <label htmlFor="password">Password</label>
                  <input type="password" name='password' className='form-input' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="form-group">
                  <input type="submit" className='form-input' value="Submit" id='form-button'/>
              </div>
          </form>
      </div>
    </div>
  )
}
