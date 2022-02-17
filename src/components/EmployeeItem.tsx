import { Link } from 'react-router-dom'
import { Employee } from '../types/Employee'
import SocialIcon from './SocialIcon'

type ItemProps = {
  employee: Employee
  showList: boolean
  sortByOffice: (val: string) => void
}

const EmployeeItem = (props: ItemProps): JSX.Element => {
  const { showList, sortByOffice } = props
  const { imagePortraitUrl, name, office, linkedIn, gitHub, twitter } =
    props.employee

  const socialIconsOutput: JSX.Element = (
    <>
      {linkedIn && (
        <SocialIcon
          url={`https://linkedin.com/${linkedIn}`}
          imgSrc={`/icons/linkedin.svg`}
          alt={`linkedin profile from ${name}`}
        />
      )}
      {gitHub && (
        <SocialIcon
          url={`https://github.com/${gitHub}`}
          imgSrc={`/icons/github.svg`}
          alt={`github profile from ${name}`}
        />
      )}
      {twitter && (
        <SocialIcon
          url={`https://twitter.com/${twitter}`}
          imgSrc={`/icons/twitter.svg`}
          alt={`twitter profile from ${name}`}
        />
      )}
    </>
  )

  return (
    <article
      className={`flex ${
        !showList ? 'flex-col mx-auto max-w-xs' : 'flex-row w-full'
      } p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl bg-white shadow-xl hover:shadow-md transition-shadow`}
    >
      <div className="flex flex-row flex-shrink-0 relative">
        {!showList && (
          <div className="flex flex-row absolute bottom-2 right-2">
            {socialIconsOutput}
          </div>
        )}
        <img
          src={imagePortraitUrl}
          alt={name}
          title={name}
          className={`flex rounded-xl ${
            !showList ? 'w-full' : 'w-24 mr-4'
          } h-auto shadow-xl`}
        />
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col flex-grow my-2 md:my-0">
          <Link to={`/meet/${name.split(' ').join('-').toLowerCase()}`}>
            <h2 className="text-slate-900 hover:text-slate-800 ml-0 md:hover:ml-2 text-md lg:text-lg font-bold word-break pt-1 md:pt-3 pb-1 transition-all">
              {name}
            </h2>
          </Link>
          <span
            onClick={() => sortByOffice(office)}
            className="text-blue-600 hover:text-blue-900 text-sm font-medium cursor-pointer"
          >
            {`#${office}'s `}
            <strong className="text-slate-800 font-normal cursor-default">
              office
            </strong>
          </span>
        </div>

        {showList && <div className="flex flex-col">{socialIconsOutput}</div>}
      </div>
    </article>
  )
}

export default EmployeeItem
