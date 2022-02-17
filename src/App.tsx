import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { EmployeesContextProvider } from './context/employeesContext'

const App = (): JSX.Element => (
  <EmployeesContextProvider>
    <Header />
    <main className="flex flex-col bg-gray-50 min-h-screen">
      <Outlet />
    </main>
  </EmployeesContextProvider>
)

export default App
