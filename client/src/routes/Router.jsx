import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../components/Authentication/Login'
import EmployeeDashboard from '../components/Dashboard/EmployeeDashboard'
import Dashboard from '../components/AdminDashboard/Dashboard'
import InitBank from '../components/InitBank/InitBank'
import Transactions from '../components/Transactions/Transactions'
import NotFound from '../components/404/NotFound'
import AboutUs from '../components/AboutUs/AboutUs'
import LoanDashboard from '../components/Loans/LoanDashboard'

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<EmployeeDashboard/>}/>
            <Route path='/admin' element={<Dashboard/>}/>
            <Route path='/initBank' element={<InitBank/>}/>
            <Route path='/transactions' element={<Transactions/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/loans' element={<LoanDashboard/>}/>
            <Route path='/*' element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  )
}
