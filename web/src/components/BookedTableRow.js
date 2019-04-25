import React from 'react'
import { format } from 'date-fns'

const BookedTableRow = ({ advisorId, studentName, dateTime }) => (
  <tr>
    <td>{advisorId}</td>
    <td>{studentName}</td>
    <td>
      <time dateTime={dateTime}>{format(new Date(dateTime), 'M/D/YYYY h:mm a')}</time>
    </td>
  </tr>
)

export default BookedTableRow
