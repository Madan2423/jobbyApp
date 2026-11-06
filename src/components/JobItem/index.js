import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobItem = props => {
  const {jobItem} = props
  const {
    id,
    log,
    employmentType,
    jobDescription,
    location,
    packageLPA,
    rating,
    title,
  } = jobItem

  return (
    <li className="main_div">
      <Link to={`/jobs/${id}`} className="Link">
        <div className="cont1">
          <div>
            <img src={log} alt="company logo" className="jobItemImg" />
          </div>
          <div className="sub111">
            <h1 className="text">{title}</h1>
            <div className="ratingContainer">
              <AiFillStar />
              <p className="text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="cont211">
          <div className="cont222">
            <p className="text">{location}</p>
            <p className="t1">{employmentType}</p>
          </div>
          <div>
            <p className="text">{packageLPA}</p>
          </div>
        </div>
        <hr className="hr22" />
        <div>
          <h1 className="text">Description</h1>
          <p className="text">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
