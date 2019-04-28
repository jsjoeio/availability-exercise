import React, { useState } from 'react'
import AdvisorTable from './components/AdvisorTable'
import BookedTable from './components/BookedTable'
import Form from './components/Form'
import { createBooking } from './utils/helpers'
import uuidv4 from 'uuid/v4'

const App = () => {
  // Check if name input field is valid. If false, we display error on input field.
  const [isValid, setIsValid] = useState(true)
  const [shouldResetName, setShouldResetName] = useState(false)
  let savedName
  /*
    Instead of storing name in the App state (which would cause the app to rerender because of the onChange handler for the input), we pass getName to the <Form /> and call it so it gets the
    name from the Form state.
  */
  function getName (name) {
    savedName = name
  }
  /*
    Used to keep track of bookings made on client
    This way, we can optimistically update the client without having to make a new request to grab the bookings.
  */
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
