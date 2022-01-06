import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

class UploadFileRoute extends Component {
  state = {postData: [], apiStatusMsg: ''}

  handleFiles = files => {
    const reader = new FileReader()
    reader.onload = function (e) {
      console.log(reader.result)
    }
    reader.readAsText(files[0])
    console.log(reader)
    this.setState({postData: reader})
  }

  handleFileSelect = event => {
    this.handleFiles(event.target.files)
  }

  uploadSuccess = successMsg => {
    this.setState({apiStatusMsg: successMsg})
  }

  uploadFailure = errorMsg => {
    this.setState({apiStatusMsg: errorMsg})
  }

  submitForm = async event => {
    console.log('click')
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    event.preventDefault()
    const {postData} = this.state

    const url = 'https://aftab-financepeer-assignment.herokuapp.com/posts/add'

    const option = {
      method: 'POST',
      body: JSON.stringify(postData),
      mode: 'no-cors',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, option)

    if (response.ok === true) {
      const data = await response.json()
      this.uploadSuccess(data.success_msg)
      console.log(data)
    } else {
      const data = await response.json()
      this.uploadFailure(data.error_msg)
      console.log(data)
    }
  }

  render() {
    const {postData, apiStatusMsg} = this.state
    return (
      <>
        <Header />
        <div className="add-file-container">
          <form onSubmit={this.submitForm} className="add-file-form">
            <label htmlFor="myFile" className="label">
              Select a file:
            </label>
            <input
              type="file"
              id="myFile"
              name="myfile"
              accept=".json"
              onChange={this.handleFileSelect}
              className="input"
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default UploadFileRoute
