import React from 'react'
import BookedTableRow from './BookedTableRow'

const BookedTabled = () => (
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
        {/* <BookedTableRow advisorId={12345} studentName='Joe Previte' dateTime='2019-04-04T13:00:00-04:00' /> */}
      </tbody>
    </table>
  </React.Fragment>
)

export default BookedTabled
