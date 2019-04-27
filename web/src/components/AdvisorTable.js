import React, { useState, useEffect } from 'react'
import AdvisorTableRow from './AdvisorTableRow'
import { updateAvailability } from '../utils/helpers'

const AdvisorTable = ({ optimisticBookings, bookAppointment }) => {
  const [advisorAvailability, setAdvisorAvailability] = useState({})
  useEffect(() => {
    async function fetchAdvisorAvailability () {
      try {
        if (typeof window !== 'undefined') {
          const res = await fetch('http://localhost:4433/advisors')
          const json = await res.json()
          return json
        }
      } catch (e) {
        console.error("Failed to fetch 'advisorAvailability' data", e)
      }
    }
    fetchAdvisorAvailability().then(data => {
      setAdvisorAvailability(data)
    })
  }, [])
  const availability = updateAvailability(optimisticBookings, advisorAvailability)
  return (
    <React.Fragment>
      <h2>Available Times</h2>
      <table className='advisors table'>
        <thead>
          <tr>
            <th>Advisor ID</th>
            <th>Available Times</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(availability).length > 1 && Object.keys(availability).map(advisorId => {
            if (availability[advisorId].length > 0) {
              return (
                <AdvisorTableRow key={advisorId} advisorId={advisorId} availableTimes={availability[advisorId]} bookAppointment={bookAppointment} />
              )
            }
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default AdvisorTable
