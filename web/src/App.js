import React, { useState } from 'react'
import AdvisorTable from './components/AdvisorTable'
import BookedTable from './components/BookedTable'
import Form from './components/Form'
import { createBooking } from './utils/helpers'

const App = () => {
  const [name, setName] = useState('')

  async function bookAppointment (advisorId, dateTime) {
    try {
      const response = await createBooking({ advisorId, studentName: name, dateTime })
      console.log(response, 'hello response')
    } catch (error) {
      console.error(error)
    }
  }
  /*

  3. Pass helper createBooking function to advisorTable
  4. When you create a booking and receieve a 201, you need to call two functions
  4a. One function removes it from the AdvisorTable
  4b. The other function adds it to the BookedTable
  */
  return (
    <div className='App container'>
      <h1>Book Time with an Advisor</h1>
      <span id='today'>Today is {new Date().toLocaleDateString()}.</span>
      <Form name={name} setName={setName} />
      <AdvisorTable bookAppointment={bookAppointment} />
      <BookedTable />
    </div>
  )
}

export default App
