import React, { useState } from 'react'
import AdvisorTable from './components/AdvisorTable'
import BookedTable from './components/BookedTable'
import Form from './components/Form'
import { createBooking } from './utils/helpers'
import uuidv4 from 'uuid/v4'

const App = () => {
  const [isValid, setIsValid] = useState(true)
  const [shouldResetName, setShouldResetName] = useState(false)
  let savedName
  function getName (name) {
    savedName = name
  }
  const [optimisticBookings, setOptimisticBookings] = useState([])
  async function bookAppointment (advisorId, dateTime) {
    if (savedName.trim() !== '') {
      setIsValid(true)
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
          setShouldResetName(true)
          setShouldResetName(false)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      setIsValid(false)
    }
  }

  return (
    <div className='App container'>
      <h1>Book Time with an Advisor</h1>
      <span id='today'>Today is {new Date().toLocaleDateString()}.</span>
      <Form getName={getName} isValid={isValid} shouldResetName={shouldResetName} />
      <AdvisorTable optimisticBookings={optimisticBookings} bookAppointment={bookAppointment} />
      <BookedTable optimisticBookings={optimisticBookings} />
    </div>
  )
}

export default App
