import React, { Component } from 'react'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.fetchToday()
  }

  async fetchToday () {
    try {
      const res = await fetch('http://localhost:4433/today')
      const json = await res.json()
      this.setState({ today: json.today })
    } catch (e) {
      console.error("Failed to fetch 'today' data", e)
    }
  }

  render () {
    return (
      <div className='App container'>
        <h1>Book Time with an Advisor</h1>

        {this.state.today && <span id='today'>Today is {this.state.today}.</span>}

        <form id='name-form' className='col-md-6'>
          <div className='form-group'>
            <label htmlFor='name-field'>Your Name</label>
            <input placeholder='Darrell Silver' type='text' id='name-field' className='form-control' />
          </div>
        </form>

        <h2>Available Times</h2>
        <table className='advisors table'>
          <thead>
            <tr>
              <th>Advisor ID</th>
              <th>Available Times</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>35545</td>
              <td>
                <ul className='list-unstyled'>
                  <li>
                    <time dateTime='2019-04-04T13:00:00-04:00' className='book-time'>4/4/2019 1:00 pm</time>
                    <button className='book btn-small btn-primary'>Book</button>
                  </li>
                  <li>
                    <time dateTime='2019-04-05T10:00:00-04:00' className='book-time'>4/5/2019 10:00 am</time>
                    <button className='book btn-small btn-primary'>Book</button>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>36232</td>
              <td>
                <ul className='list-unstyled'>
                  <li>
                    <time dateTime='2019-04-02T13:00:00-04:00' className='book-time'>4/2/2019 1:00 pm</time>
                    <button className='book btn-small btn-primary'>Book</button>
                  </li>
                  <li>
                    <time dateTime='2019-04-03T11:00:00-04:00' className='book-time'>4/3/2019 11:00 am</time>
                    <button className='book btn-small btn-primary'>Book</button>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Booked Times</h2>
        <table className='bookings table'>
          <thead>
            <tr>
              <th>Advisor ID</th>
              <th>Student Name</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>36232</td>
              <td>John Smith</td>
              <td>
                <time dateTime='2019-04-03T10:00:00-04:00'>4/3/2019 10:00 am</time>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
