import { useState } from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import { LocalStorageProvider } from './contexts/useLocalstorage'
import { DatabaseProvider } from './contexts/DatabaseProvider'

function App() {
  return (
    <DatabaseProvider>
      <Dashboard/>
    </DatabaseProvider>
  )  
}

export default App
