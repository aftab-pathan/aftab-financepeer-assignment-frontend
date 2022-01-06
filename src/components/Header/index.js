import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineMail} from 'react-icons/ai'
import {BsHouseDoor} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="bg-navbar">
      <div className="mobile-navbar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="mobile-logo"
            alt="website logo"
          />
        </Link>

        <div className="mobile-nav-menu">
          <Link to="/">
            <button type="button" className="mobile-menu-btn">
              <BsHouseDoor className="mobile-menu-logo" />
            </button>
          </Link>

          <Link to="/jobs">
            <button type="button" className="mobile-menu-btn">
              <AiOutlineMail className="mobile-menu-logo" />
            </button>
          </Link>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={onClickLogout}
          >
            <FiLogOut className="mobile-menu-logo" />
          </button>
        </div>
      </div>

      <div className="large-navbar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="mobile-logo"
            alt="website logo"
          />
        </Link>
        <div className="large-nav-menu">
          <Link to="/">
            <button type="button" className="large-nav-menu-btn">
              All-Post
            </button>
          </Link>
          <Link to="/jobs">
            <button type="button" className="large-nav-menu-btn">
              Create-Post
            </button>
          </Link>
        </div>
        <button
          type="button"
          className="large-logout-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
