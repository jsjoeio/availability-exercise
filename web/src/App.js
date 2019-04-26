import React from 'react'
import AdvisorTable from './components/AdvisorTable'
import BookedTable from './components/BookedTable'
import Form from './components/Form'

const App = () => {
  /*

  1. Store name in app...
  2. figure out how to pass down name
  3. Pass helper createBooking function to advisorTable
  4. When you create a booking and receieve a 201, you need to call two functions
  4a. One function removes it from the AdvisorTable
  4b. The other function adds it to the BookedTable
  */
  return (
    <div className='App container'>
      <h1>Book Time with an Advisor</h1>
      <span id='today'>Today is {new Date().toLocaleDateString()}.</span>
      <Form />
      <AdvisorTable />
      <BookedTable />
    </div>
  )
}

export default App
