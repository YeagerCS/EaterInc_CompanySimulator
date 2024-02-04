import { DatabaseProvider } from './contexts/DatabaseProvider'
import AuthenticationProvider from './contexts/AuthenticationProvider'
import Router from './routes/Router'

function App() {
  return (
    <DatabaseProvider>
      <AuthenticationProvider>
        <Router/>
      </AuthenticationProvider>
    </DatabaseProvider>
  )  
}

export default App
