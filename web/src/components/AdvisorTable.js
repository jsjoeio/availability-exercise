import React, { useState, useEffect } from 'react'
import AvailableTimeRow from './AvailableTimeRow'

const AdvisorTable = () => {
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
        console.error("Failed to fetch 'today' data", e)
      }
    }
    fetchAdvisorAvailability().then(data => {
      setAdvisorAvailability(data)
    })
  }, [])
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
          {Object.keys(advisorAvailability).length > 1 && Object.keys(advisorAvailability).map(advisorKey => (
            <AvailableTimeRow key={advisorKey} id={advisorKey} availabileTimes={advisorAvailability[advisorKey]} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default AdvisorTable
