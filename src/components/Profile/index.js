import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import './index.css'

const appStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileData: {}, appStatus: appStatusConstant.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      appStatus: appStatusConstant.in_progress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const opitions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, opitions)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        imageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        appStatus: appStatusConstant.success,
      })
    } else {
      this.setState({
        appStatus: appStatusConstant.failure,
      })
    }
  }

  profileRender = () => {
    const {profileData} = this.state
    const {name, imageUrl, shortBio} = profileData
    return (
      <div className="profile">
        <img src={imageUrl} alt="profile" className="profileImage" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  loaderRender = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  failureRender = () => (
    <div className="profileFailure">
      <button
        className="profileBtn"
        onClick={this.getProfileData}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderProfilePage = () => {
    const {appStatus} = this.state
    switch (appStatus) {
      case appStatusConstant.success:
        return this.profileRender()
      case appStatusConstant.failure:
        return this.failureRender()
      case appStatusConstant.in_progress:
        return this.loaderRender()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderProfilePage()}</div>
      </div>
    )
  }
}

export default Profile
