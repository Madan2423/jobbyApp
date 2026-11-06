import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LogIn extends Component {
  state = {username: '', password: '', isErrorMsg: '', isError: false}

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onError(data.error_msg)
    }
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onError = erroeMsg => {
    this.setState({
      isErrorMsg: erroeMsg,
      isError: true,
    })
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="cont2">
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          value={username}
          onChange={this.onChangeUserName}
          placeholder="Username"
          className="input"
          id="username"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="cont2">
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          className="input"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          id="password"
        />
      </div>
    )
  }

  render() {
    const {isErrorMsg, isError} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="outter">
        <div className="loginFrom">
          <div className="cont1">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="image2"
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <div>{this.renderUsername()}</div>
            <div>{this.renderPassword()}</div>
            <button type="submit" className="Btn">
              Login
            </button>
          </form>
          {isError && <p className="p">*{isErrorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LogIn
