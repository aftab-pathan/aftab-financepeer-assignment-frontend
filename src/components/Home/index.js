import {Link} from 'react-router-dom'
import ReactFileReader from 'react-file-reader'

import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <>
      <Header />
    </>
  )
}

export default Home
