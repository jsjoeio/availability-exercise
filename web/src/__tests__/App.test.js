import React from 'react'
import 'jest-dom/extend-expect'
import App from '../App'
import { render } from 'react-testing-library'
import AdvisorTableRow from '../components/AdvisorTableRow'
import BookedTableRow from '../components/BookedTableRow'

describe('Availability app', () => {
  it('renders to the DOM', () => {
    const { getByText } = render(<App />)
    const title = getByText('Book Time with an Advisor')
    expect(title).toBeInTheDocument()
  })

  it('shows all the available times from the Thinkful API sorted and grouped by Advisor ID if there are no bookings.', () => {
    const fakeBookings = []
    const fakeAvailabilityData = {
      '424108': [
        '2019-04-29T12:00:00-04:00',
        '2019-04-29T10:45:00-04:00'
      ],
      '424185': [
        '2019-04-28T18:00:00-04:00',
        '2019-04-29T12:45:00-04:00'
      ]
    }
    function renderFakeApp () {
      const bookAppointment = () => console.log('booking appointment')

      return (
        <React.Fragment>
          <div>
            <h2>Available Times</h2>
            <table className='advisors table'>
              <thead>
                <tr>
                  <th>Advisor ID</th>
                  <th>Available Times</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(fakeAvailabilityData).length > 1 && Object.keys(fakeAvailabilityData).map(advisorId => {
                  if (fakeAvailabilityData[advisorId].length > 0) {
                    return (
                      <AdvisorTableRow key={advisorId} advisorId={advisorId} availableTimes={fakeAvailabilityData[advisorId]} bookAppointment={bookAppointment} />
                    )
                  }
                })}
              </tbody>
            </table>
          </div>
          <div>
            <h2>Booked Times</h2>
            <table className='bookings table'>
              <thead>
                <tr>
                  <th>Advisor ID</th>
                  <th>Student Name</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody data-testid='bookings'>
                {fakeBookings.map(booking => (
                  <BookedTableRow key={`${booking.bookingId}-${booking.dateTime}`} advisorId={booking.advisorId} studentName={booking.studentName} dateTime={booking.dateTime} />
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )
    }

    const { getByText, queryByTestId } = render(renderFakeApp())

    // No bookings should show
    expect(queryByTestId('bookings')).toBeEmpty()
    const availableTimes = [...fakeAvailabilityData['424108'], ...fakeAvailabilityData['424185']]
    for (let i = 0; i < availableTimes.length; i++) {
      // We should see all the available times
      expect(queryByTestId(availableTimes[i])).toBeVisible()
    }
  })
})
