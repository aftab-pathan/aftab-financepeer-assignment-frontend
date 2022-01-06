import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="bg-not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-logo"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        Sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
