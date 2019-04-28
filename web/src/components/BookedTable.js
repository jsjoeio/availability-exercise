import React, { useState, useEffect } from 'react'
import BookedTableRow from './BookedTableRow'

const BookedTable = ({ optimisticBookings }) => {
  const [bookedTimes, setBookedTimes] = useState([])
  useEffect(() => {
    async function fetchBookings () {
      try {
        if (typeof window !== 'undefined') {
          const res = await fetch(`${process.env.API_URL}/bookings`)
          const json = await res.json()
          return json
        }
      } catch (e) {
        console.error("Failed to fetch 'today' data", e)
      }
    }
    fetchBookings().then(data => {
      setBookedTimes(data)
    })
  }, [])
  const allBookings = [...bookedTimes, ...optimisticBookings]
  return (
    <React.Fragment>
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
          {allBookings.map(booking => (
            <BookedTableRow key={`${booking.bookingId}-${booking.dateTime}`} advisorId={booking.advisorId} studentName={booking.studentName} dateTime={booking.dateTime} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  )
}
export default BookedTable
