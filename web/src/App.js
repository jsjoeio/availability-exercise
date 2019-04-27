import React, { useState } from 'react'
import AdvisorTable from './components/AdvisorTable'
import BookedTable from './components/BookedTable'
import Form from './components/Form'
import { createBooking } from './utils/helpers'
import uuidv4 from 'uuid/v4'

const App = () => {
  let savedName
  function getName (name) {
    savedName = name
  }
  const [optimisticBookings, setOptimisticBookings] = useState([])
  async function bookAppointment (advisorId, dateTime) {
    try {
      const newBooking = {
        bookingId: uuidv4(),
        advisorId,
        dateTime,
        studentName: savedName
      }
      const response = await createBooking(newBooking)
      // If successfully created on server, save newBooking
      if (response.status === 201) {
        setOptimisticBookings([...optimisticBookings, newBooking])
      }
    } catch (error) {
      console.error(error)
    }
  }
  /*

  4. When you create a booking and receieve a 201, you need to call two functions
  4a. One function removes it from the AdvisorTable
  */
  return (
    <div className='App container'>
      <h1>Book Time with an Advisor</h1>
      <span id='today'>Today is {new Date().toLocaleDateString()}.</span>
      <Form getName={getName} />
      <AdvisorTable optimisticBookings={optimisticBookings} bookAppointment={bookAppointment} />
      <BookedTable optimisticBookings={optimisticBookings} />
    </div>
  )
}

export default App
