import { dateSortDesc, updateAvailability } from '../utils/helpers'

describe('dateSortDesc helper function', () => {
  it('should sort dates in a descending order', () => {
    const fakeDates = ['2019-05-01T19:00:00-04:00', '2019-04-30T14:00:00-04:00', '2019-05-01T01:00:00-04:00']
    const actual = fakeDates.sort(dateSortDesc)
    const expected = ['2019-04-30T14:00:00-04:00', '2019-05-01T01:00:00-04:00', '2019-05-01T19:00:00-04:00']
    expect(actual).toEqual(expected)
  })
})

describe('updateAvailability helper function', () => {
  it('should update the availability to not include bookings from client', () => {
    const fakeAvailability = {
      372955: ['2019-04-04T13:00:00-04:00', '2019-04-04T11:00:00-04:00'],
      372954: ['2019-04-04T13:00:00-04:00']
    }
    const fakeOptimisticBookings = [
      {
        bookingId: '121434kf',
        advisorId: '372955',
        studentName: 'Joe Previte',
        dateTime: '2019-04-04T13:00:00-04:00'
      }
    ]
    const actual = updateAvailability(fakeOptimisticBookings, fakeAvailability)
    const expected = {
      372955: ['2019-04-04T11:00:00-04:00'],
      372954: ['2019-04-04T13:00:00-04:00']
    }
    expect(actual).toEqual(expected)
  })
})
