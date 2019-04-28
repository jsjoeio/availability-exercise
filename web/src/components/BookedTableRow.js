import React from 'react'
import { format } from 'date-fns'

const BookedTableRow = ({ advisorId, studentName, dateTime }) => (
  <tr>
    <td>{advisorId && advisorId}</td>
    <td>{studentName && studentName}</td>
    <td>
      <time dateTime={dateTime}>{dateTime && format(new Date(dateTime), 'M/D/YYYY h:mm a')}</time>
    </td>
  </tr>
)

export default BookedTableRow
