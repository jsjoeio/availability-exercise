import React from 'react'
import AdvisorTable from './components/AdvisorTable'
import BookedTable from './components/BookedTable'

const App = () => (
  <div className='App container'>
    <h1>Book Time with an Advisor</h1>

    <span id='today'>Today is {new Date().toLocaleDateString()}.</span>

    <form id='name-form' className='col-md-6'>
      <div className='form-group'>
        <label htmlFor='name-field'>Your Name</label>
        <input placeholder='Darrell Silver' type='text' id='name-field' className='form-control' />
      </div>
    </form>

    <AdvisorTable />
    <BookedTable />
  </div>
)

export default App
