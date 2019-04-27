import React from 'react'
import { format } from 'date-fns'
import { dateSortDesc } from '../utils/helpers'

const AdvisorTableRow = ({ advisorId, availableTimes, bookAppointment }) => (
  <tr>
    <td>{advisorId}</td>
    <td>
      <ul className='list-unstyled'>
        {availableTimes.sort(dateSortDesc).map(time => (
          <li key={time}>
            <time dateTime={time} className='book-time'>{format(new Date(time), 'M/D/YYYY h:mm a')}</time>
            <button onClick={() => bookAppointment(advisorId, time)} className='book btn-small btn-primary'>Book</button>
          </li>
        ))}
      </ul>
    </td>
  </tr>
)

export default AdvisorTableRow
