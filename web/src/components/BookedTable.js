import React, { useState, useEffect } from 'react'
import BookedTableRow from './BookedTableRow'

const BookedTable = ({ optimisticBookings }) => {
  const [loading, setLoading] = useState(false)
  const [bookedTimes, setBookedTimes] = useState([])
  useEffect(() => {
    async function fetchBookings () {
      try {
        setLoading(true)
        if (typeof window !== 'undefined') {
          const res = await fetch('https://floating-reaches-66025.herokuapp.com/bookings')
          const json = await res.json()
          console.log('hi jason', json)
          return json
        }
      } catch (e) {
        setLoading(false)
        console.error("Failed to fetch 'bookings' data", e)
      }
    }
    fetchBookings().then(data => {
      setBookedTimes(data)
      setLoading(false)
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
          {loading && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          {allBookings.map(booking => (
            <BookedTableRow key={`${booking.bookingId}-${booking.dateTime}`} advisorId={booking.advisorId} studentName={booking.studentName} dateTime={booking.dateTime} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  )
}
export default BookedTable
