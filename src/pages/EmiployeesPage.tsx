import { useEffect, useState } from 'react'
import EmployeeItem from '../components/EmployeeItem'
import Spinner from '../components/Spinner'
import { useEmployeesContext } from '../context/employeesContext'
import useEmployees from '../hooks/useEmployees'
import { Employee } from '../types/Employee'

const EmployeesPage = (): JSX.Element => {
  const { employees } = useEmployeesContext()
  const { fetchEmployees } = useEmployees()

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [sortedBy, setSortedBy] = useState<string>('')
  const [gridListToggle, setGridListToggle] = useState<boolean>(false)

  useEffect(() => {
    // fetching Employees from API
    !employees.length && fetchEmployees()
  }, [employees, fetchEmployees])

  useEffect(() => {
    // mapping data to use it as a separate
    // array for filtering
    setFilteredEmployees(employees)
  }, [employees])

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!event.target.value.trim()) {
      setFilteredEmployees(employees)
      return
    }
    // filter by name
    const filteredEmp: Employee[] = employees.filter((emp: Employee) =>
      emp.name
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    )

    setFilteredEmployees(filteredEmp)
    setSortedBy('')
  }

  const handleSortByOffice = (office: string): void => {
    setSortedBy(office)
    // input empty string check
    if (!office.trim()) {
      setFilteredEmployees(employees)
      return
    }
    // sort by office
    const filteredEmp: Employee[] = employees.filter(
      (emp: Employee) => emp.office === office
    )

    setFilteredEmployees(filteredEmp)
  }

  const employeesOutput = (): JSX.Element[] =>
    filteredEmployees.map((emp: Employee) => (
      <EmployeeItem
        key={emp.email}
        employee={emp}
        showList={gridListToggle}
        sortByOffice={handleSortByOffice}
      />
    ))

  // conditional classes based on layout type: 'grid' | 'list'
  const viewClasses: string = !gridListToggle
    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
    : 'grid-rows-1'

  return (
    <>
      <section className="container flex items-center mx-auto px-4 my-8">
        <div className="relative flex-3 sm:flex-1">
          <input
            type="search"
            placeholder="Search fellow by 'name'"
            onChange={inputChangeHandler}
            className="w-full p-4 focus:px-5 border rounded-lg border-slate-300 focus:border-slate-400 bg-white outline-none shadow-lg focus:shadow-md transition-all text-md font-medium"
          />
        </div>
        <div className="flex flex-1 sm:flex-1 justify-end">
          {sortedBy && (
            <button
              type="button"
              className="text-slate-600 hover:text-slate-800 text-sm rounded-lg px-3 py-1"
              onClick={() => handleSortByOffice('')}
            >
              clear sorting
            </button>
          )}
          <div className="flex ml-2">
            {gridListToggle ? (
              <button
                type="button"
                aria-label="show greed view"
                className="p-2  m-1 cursor-pointer border border-slate-50 hover:border-slate-300"
                onClick={() => setGridListToggle(false)}
              >
                <img
                  src="/icons/grid.svg"
                  alt="grid view"
                  title="grid"
                  className="w-5"
                />
              </button>
            ) : (
              <button
                type="button"
                aria-label="show list view"
                className="p-2 m-1 cursor-pointer border border-slate-50 hover:border-slate-300"
                onClick={() => setGridListToggle(true)}
              >
                <img
                  src="/icons/list.svg"
                  alt="list view"
                  title="list"
                  className="w-5"
                />
              </button>
            )}
          </div>
        </div>
      </section>
      {filteredEmployees.length && (
        <section
          className={`container mx-auto px-4 mb-16 gap-4 grid ${viewClasses}`}
        >
          {employeesOutput()}
        </section>
      )}
      {!employees.length && (
        <section className={`container mx-auto px-8`}>
          <Spinner />
        </section>
      )}
    </>
  )
}

export default EmployeesPage
