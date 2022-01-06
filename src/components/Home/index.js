import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import BlogCard from '../BlogCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const postDataDummy = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body:
      'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body:
      'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
  {
    userId: 1,
    id: 4,
    title: 'eum et est occaecati',
    body:
      'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
  },
  {
    userId: 1,
    id: 5,
    title: 'nesciunt quas odio',
    body:
      'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
  },
]

class Home extends Component {
  state = {
    ApiStatus: apiStatus.initial,
    postData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getPostSuccess = postData => {
    const updatedData = {
      userId: postData.user_id,
      title: postData.title,
      body: postData.body,
    }
    this.setState({
      postData: updatedData,
      ApiStatus: apiStatus.success,
    })
  }

  getPostFailure = () => {
    this.setState({ApiStatus: apiStatus.failure})
  }

  getData = async () => {
    this.setState({ApiStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://aftab-financepeer-assignment.herokuapp.com/'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)

    if (response.ok) {
      const data = await response.json()
      this.getPostSuccess(data)
    } else {
      this.getPostFailure()
    }
  }

  renderPostCard = () => {
    const {postData} = this.state
    return (
      <>
        <ul className="similar-post-list-container">
          {postDataDummy.map(eachpost => (
            <BlogCard key={eachpost.id} postDetails={eachpost} />
          ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickpostsRetry = () => {
    this.getpostDetails()
  }

  renderFailure = () => (
    <div className="no-post-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-post-img"
      />
      <h1 className="no-post-heading">Oops! Something Went Wrong</h1>
      <p className="no-post-description">
        We cannot seem to find the post you are looking for.
      </p>
      <button
        type="button"
        className="profile-fail-retry-btn"
        onClick={this.onClickpostsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderFinalpostCard = () => {
    const {ApiStatus} = this.state
    switch (ApiStatus) {
      case apiStatus.success:
        return this.renderPostCard()
      case apiStatus.inProgress:
        return this.renderLoaderView()
      case apiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-post-item-details">{this.renderFinalpostCard()}</div>
      </>
    )
  }
}

export default Home
