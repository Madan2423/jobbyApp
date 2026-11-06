import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import JobItem from '../JobItem'
import Profile from '../Profile'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusContainer = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobSection extends Component {
  state = {
    jobList: [],
    apiStatus: apiStatusContainer.initial,
    searchInput: '',
    employmentType: [],
    salaryRange: '',
  }

  onChangeSalary = event => {
    this.setState({salaryRange: event.target.value}, this.getJobList)
  }

  onChangeEmployment = event => {
    const {value, checked} = event.target

    this.setState(
      prevState => ({
        employmentType: checked
          ? [...prevState.employmentType, value]
          : prevState.employmentType.filter(each => each !== value),
      }),
      this.getJobList,
    )
  }

  componentDidMount() {
    this.getJobList()
  }

  getJobList = async () => {
    this.setState({
      apiStatus: apiStatusContainer.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, salaryRange, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        log: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packageLPA: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusContainer.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusContainer.failure,
      })
    }
  }

  searchValue = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderJobList = () => {
    const {jobList} = this.state

    return jobList.length > 0 ? (
      <ul className='unorder'>
        {jobList.map(each => (
          <JobItem key={each.id} jobItem={each} />
        ))}
      </ul>
    ) : (
      <div className='noJobsContainer'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
          alt='no jobs'
          className='noJobsImage'
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  renderjobItems = () => <div>{this.renderJobList()}</div>

  renderError = () => (
    <div>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type='button' onClick={this.getJobList}>
        Retry
      </button>
    </div>
  )

  renderInPrograss = () => (
    <div data-testid='loader'>
      <Loader type='TailSpin' color='yellow' height={50} width={50} />
    </div>
  )

  renderSearchList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContainer.success:
        return this.renderjobItems()
      case apiStatusContainer.failure:
        return this.renderError()
      case apiStatusContainer.inProgress:
        return this.renderInPrograss()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <Header />
        <div className='jobSection'>
          <div className='jobContainer1'>
            <div>
              <Profile />
            </div>
            <hr className='hr' />
            <div className='CS1'>
              <h1 className='jobh1'>Type of Employment</h1>
              <form className='form'>
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId}>
                    <input
                      type='checkbox'
                      id={each.employmentTypeId}
                      value={each.employmentTypeId}
                      onChange={this.onChangeEmployment}
                    />
                    <label htmlFor={each.employmentTypeId}>{each.label}</label>
                  </li>
                ))}
              </form>
            </div>
            <hr className='hr' />
            <div className='jobSalarySction'>
              <h1 className='jobh1'>Salary Range</h1>
              <form className='form'>
                {salaryRangesList.map(each => (
                  <li key={each.salaryRangeId}>
                    <input
                      type='radio'
                      id={each.salaryRangeId}
                      name='salary'
                      value={each.salaryRangeId}
                      onChange={this.onChangeSalary}
                    />
                    <label htmlFor={each.salaryRangeId}>{each.label}</label>
                  </li>
                ))}
              </form>
            </div>
          </div>
          <div className='jobContainer2'>
            <div className='inputSection'>
              <input
                value={searchInput}
                type='search'
                className='jobJnput'
                onChange={this.searchValue}
                placeholder='Search'
              />
              <button
                type='button'
                data-testid='searchButton'
                onClick={this.getJobList}
              >
                Search
              </button>
            </div>
            {this.renderSearchList()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobSection
