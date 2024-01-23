import { useState } from 'react'
import Dashboard from './components/AdminDashboard/Dashboard'
import { LocalStorageProvider } from './contexts/useLocalstorage'
import { DatabaseProvider } from './contexts/DatabaseProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Authentication/Login'
import AuthenticationProvider from './contexts/AuthenticationProvider'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import InitBank from './components/InitBank/InitBank'

function App() {
  return (
    <DatabaseProvider>
      <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Dashboard/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/dashboard' element={<EmployeeDashboard/>}/>
          <Route exact path='/initBank' element={<InitBank/>}/>
        </Routes>
      </BrowserRouter>
      </AuthenticationProvider>
    </DatabaseProvider>
  )  
}

export default App
