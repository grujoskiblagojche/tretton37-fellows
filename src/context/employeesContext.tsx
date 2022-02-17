import React, { useContext, useState } from 'react'
import { Employee } from '../types/Employee'

type Props = {
  children: React.ReactNode
}

interface EmployeesContextProps {
  employees: Employee[]
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
  getEmployee: (name: string) => Employee | undefined
}

const EmployeesContext = React.createContext<EmployeesContextProps>(
  {} as EmployeesContextProps
)

export const EmployeesContextProvider = ({ children }: Props): JSX.Element => {
  const [employees, setEmployees] = useState<Employee[]>([])

  const getEmployee = (name: string): Employee | undefined =>
    employees.find(
      (emp: Employee) => emp.name.split(' ').join('-').toLowerCase() === name
    )

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        setEmployees,
        getEmployee,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  )
}

export const useEmployeesContext = () => useContext(EmployeesContext)
