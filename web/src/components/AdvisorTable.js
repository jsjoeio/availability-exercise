import React, { useState, useEffect } from 'react'
import AdvisorTableRow from './AdvisorTableRow'
import { updateAvailability } from '../utils/helpers'

const AdvisorTable = ({ optimisticBookings, bookAppointment }) => {
  const [loading, setLoading] = useState(false)
  const [advisorAvailability, setAdvisorAvailability] = useState({})
  useEffect(() => {
    async function fetchAdvisorAvailability () {
      try {
        setLoading(true)
        if (typeof window !== 'undefined') {
          const res = await fetch('https://floating-reaches-66025.herokuapp.com/advisors')
          const json = await res.json()
          return json
        }
      } catch (e) {
        setLoading(false)
        console.error("Failed to fetch 'advisorAvailability' data", e)
      }
    }
    fetchAdvisorAvailability().then(data => {
      setAdvisorAvailability(data)
      setLoading(false)
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
          {loading && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          {availability && Object.keys(availability).length > 1 && Object.keys(availability).map(advisorId => {
            if (availability[advisorId].length > 0) {
              return (
                <AdvisorTableRow key={advisorId} advisorId={advisorId} availableTimes={availability[advisorId]} bookAppointment={bookAppointment} />
              )
            }
            return null
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default AdvisorTable
