import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiStatusContainer = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    compaineDetails: {},
    lifeStyle: {},
    similarJobs: [],
    skillList: [],
    apiStatus: apiStatusContainer.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({
      apiStatus: apiStatusContainer.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedDeatils = {
        logoUrl: data.job_details.company_logo_url,
        website: data.job_details.company_website_url,
        type: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        lap: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const updatedLifeStyle = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companylogourl: each.company_logo_url,
        employmenttype: each.employment_type,
        similarId: each.id,
        jobdescription: each.job_description,
        similarlocation: each.location,
        similarrating: each.rating,
        similartitle: each.title,
      }))
      const updatedSkillList = data.job_details.skills.map(each => ({
        skillimageurl: each.image_url,
        name: each.name,
      }))
      this.setState({
        compaineDetails: updatedDeatils,
        lifeStyle: updatedLifeStyle,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusContainer.success,
        skillList: updatedSkillList,
      })
    } else {
      this.setState({
        apiStatus: apiStatusContainer.failure,
      })
    }
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return (
      <ul>
        {similarJobs.map(job => (
          <li key={job.similarId} className="li">
            <img src={job.companylogourl} alt="similar job company logo" />
            <h1>{job.similartitle}</h1>
            <p>{job.similarrating}</p>
            <p>{job.similarlocation}</p>
            <p>{job.employmenttype}</p>
            <p>{job.jobdescription}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderSkill = () => {
    const {skillList} = this.state

    return (
      <ul className="Skill">
        {skillList.map(each => (
          <li key={each.name} className="skill">
            <img src={each.skillimageurl} alt={each.name} className="imgggg" />
            <p className="hhhh">{each.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderlifeStyle = () => {
    const {lifeStyle} = this.state
    const {description, imageUrl} = lifeStyle
    return (
      <div className="cc4">
        <div className="q1">
          <p>{description}</p>
        </div>
        <div className="q2">
          <img src={imageUrl} alt="life" className="iaag" />
        </div>
      </div>
    )
  }

  renderCompaineDetails = () => {
    const {compaineDetails} = this.state
    const {
      logoUrl,
      website,
      type,
      id,
      lap,
      jobDescription,
      location,
      rating,
      title,
    } = compaineDetails
    return (
      <>
        <div>
          <div className="detailsSect">
            <div className="cc1">
              <div>
                <img src={logoUrl} alt={title} className="iiiag" />
              </div>
              <div className="ddd">
                <h1 className="hhhh">{title}</h1>
                <p>{rating}</p>
              </div>
            </div>
            <div className="cc2">
              <div className="ss1">
                <p>{location}</p>
                <p className="pppp">{type}</p>
              </div>
              <div>
                <p>{lap}</p>
              </div>
            </div>
            <hr className="hhr" />
            <div>
              <div className="cc3">
                <div>
                  <h1 className="hhhh">Description</h1>
                </div>
                <div>
                  <a href={website} className="A">
                    vist
                  </a>
                </div>
              </div>
              <div>
                <p>{jobDescription}</p>
              </div>
            </div>
            <div>
              <h1 className="hhhh">Skills</h1>
              <div className="Skill">{this.renderSkill()}</div>
            </div>
            <div>
              <h1 className="hhhh">Life at Company</h1>
              {this.renderlifeStyle()}
            </div>
          </div>
        </div>
        <div className="coo">
          <h1 className="hhhh">Similar Jobs</h1>
          {this.renderSimilarJobs()}
        </div>
      </>
    )
  }

  render() {
    return (
      <div className="jobDetails">
        <Header />
        {this.renderCompaineDetails()}
      </div>
    )
  }
}

export default JobItemDetails
