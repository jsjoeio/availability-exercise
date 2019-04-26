import React, { useState, useEffect } from 'react'
import BookedTableRow from './BookedTableRow'

const BookedTable = ({ data }) => {
  const [bookedTimes, setBookedTimes] = useState([])
  useEffect(() => {
    async function fetchBookings () {
      try {
        if (typeof window !== 'undefined') {
          const res = await fetch('http://localhost:4433/bookings')
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
          {bookedTimes.map(bookedTime => (
            <BookedTableRow advisorId={bookedTime.advisorId} studentName={bookedTime.studentName} dateTime={bookedTime.dateTime} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  )
}
export default BookedTable
