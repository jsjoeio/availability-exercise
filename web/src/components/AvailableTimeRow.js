import React from 'react'
import { format } from 'date-fns'
import { dateSortDesc } from '../utils/helpers'

const AvailableTimeRow = ({ id, availabileTimes }) => (
  <tr>
    <td>{id}</td>
    <td>
      <ul className='list-unstyled'>
        {availabileTimes.sort(dateSortDesc).map(time => (
          <li key={time}>
            <time dateTime={time} className='book-time'>{format(new Date(time), 'M/D/YYYY h:mm a')}</time>
            <button className='book btn-small btn-primary'>Book</button>
          </li>
        ))}
      </ul>
    </td>
  </tr>
)

export default AvailableTimeRow
