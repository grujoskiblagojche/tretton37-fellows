import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEmployeesContext } from '../context/employeesContext'
import { Employee } from '../types/Employee'

const EmployeeDetailsPage = (): JSX.Element => {
  const { id } = useParams<'id'>()
  const { getEmployee } = useEmployeesContext()

  const [employeeDetails, setEmployeeDetails] = useState<Employee>()

  useEffect(() => {
    // get Employee object by 'name' used as id param
    setEmployeeDetails(getEmployee(id!))
  }, [id, employeeDetails, getEmployee])

  return (
    <>
      {employeeDetails && (
        <section className="container mx-auto my-8 px-4">
          <article className="flex flex-col lg:flex-row">
            <img
              src={employeeDetails.imagePortraitUrl}
              alt={employeeDetails.name}
              title={employeeDetails.name}
              className={`flex flex-shrink-0 rounded-xl w-full max-w-sm h-auto mr-0 mb-6 md:mb-0 md:mr-8 shadow-xl`}
            />
            <div className="flex flex-col">
              <div className="flex flex-col mb-4">
                <h2 className="text-slate-900 hover:text-slate-800 ml-0 md:hover:ml-2 text-xl md:text-2xl lg:text-4xl font-bold word-break pt-1 md:pt-3 pb-1 transition-all">
                  {employeeDetails.name}
                </h2>
                <span className="text-blue-600 hover:text-blue-900 text-sm font-medium cursor-pointer">
                  {`#${employeeDetails.office}'s `}
                  <strong className="text-slate-800 font-normal cursor-default">
                    office
                  </strong>
                </span>
              </div>
              <div
                className="flex flex-col"
                dangerouslySetInnerHTML={{ __html: employeeDetails.mainText }}
              ></div>
            </div>
          </article>
        </section>
      )}
    </>
  )
}

export default EmployeeDetailsPage
