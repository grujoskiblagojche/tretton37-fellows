import { useEmployeesContext } from '../context/employeesContext'
import { Employee } from '../types/Employee'

const useEmployees = () => {
  const { setEmployees } = useEmployeesContext()

  const fetchEmployees = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        'https://api.1337co.de/v3/employees',
        {
          headers: {
            Authorization:
              'api-key 14:2022-02-14:emelie.nilsson@tretton37.com a9c57583f9cf57ae2c87a3e60f56aaf37756ea7a31cdeb9e3a9d9a7b7b5ab308',
          },
        }
      )

      const data: Employee[] = await response.json()
      // set Employees to Context and limit result -> mimic API query limit
      setEmployees(data.slice(37, 47))
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fetchEmployees,
  }
}

export default useEmployees
