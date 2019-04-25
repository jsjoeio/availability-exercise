import React from 'react'
import { format } from 'date-fns'
import { render } from 'react-testing-library'
import AdvisorTableRow from '../components/AdvisorTableRow'

describe('AdvisorTableRow component', () => {
  const renderComponent = () => render(
    <table>
      <tbody>
        <AdvisorTableRow advisorId='35545' availableTimes={['2019-04-04T13:00:00-04:00', '2019-04-05T10:00:00-04:00']} />
      </tbody>
    </table>)
  it('should should render an advisor table row when given an id and two available times', () => {
    const { getByText } = renderComponent()
    const advisorId = getByText('35545')
    const time1 = getByText(format(new Date('2019-04-04T13:00:00-04:00'), 'M/D/YYYY h:mm a'))
    const time2 = getByText(format(new Date('2019-04-05T10:00:00-04:00'), 'M/D/YYYY h:mm a'))
    expect(advisorId).toBeTruthy()
    expect(time1).toBeTruthy()
    expect(time2).toBeTruthy()
  })
})
