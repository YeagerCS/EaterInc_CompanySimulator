import React from 'react'
import HomeHeader from '../Headers/HomeHeader'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthenticationProvider'

export default function Home() {
  const navigte = useNavigate()
  const authContext = useAuth()

  const handleNavigateDashboard = () => {
    if(authContext.jwt){
        navigte("/dashboard")
        return;
    }
    navigte("/login")
  }
  
  return (
    <>
        <HomeHeader/>
        <div className='main-div home-div'>
            <div className='form-div'>
                <div className='home-nav' onClick={() => navigte("/admin")}>
                    <p>Admin Dashboard</p>
                    <strong>Log in as the admin with which you can:</strong>
                    <em>-View and manage all employees</em>
                    <em>-Add new employees</em>
                    <em>-Manage your employees' salaries</em>
                </div>
            </div>
            <div className='form-div'>
                <div className='home-nav' onClick={handleNavigateDashboard}>
                    <p>Employee Dashboard</p>
                    <strong>Log in as an employee with which you can:</strong>
                    <em>-View your employment details</em>
                    <em>-Register and manage a bank account</em>
                    <em>-Complete transactions</em>
                </div>
            </div>
        </div>
    </>
  )
}
