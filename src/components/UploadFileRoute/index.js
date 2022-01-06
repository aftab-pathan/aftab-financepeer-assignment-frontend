import {Component} from 'react'
import {Link} from 'react-router-dom'

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
    event.preventDefault()
    const {postData} = this.state

    const url = 'https://aftab-financepeer-assignment.herokuapp.com/posts/add'
    const option = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, option)

    const data = await response.json()
    if (response.ok === true) {
      this.uploadSuccess(data.success_msg)
    } else {
      this.uploadFailure(data.error_msg)
    }
  }

  render() {
    const {postData, apiStatusMsg} = this.state
    return (
      <>
        <Header />
        <div className="add-file-container">
          <form action="/action_page.php" onSubmit={this.submitForm}>
            <label htmlFor="myFile">Select a file:</label>
            <input
              type="file"
              id="myFile"
              name="myfile"
              accept=".json"
              onChange={this.handleFileSelect}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    )
  }
}

export default UploadFileRoute
