const request = require('supertest')
const app = require('./app')
const { transformAdvisorData, checkEmptyAvailability, updateAdvisorData } = require('./utils/helpers')

describe('transformAvailabilityData', () => {
  it('returns an object with keys corresponding to advisor ids', () => {
    const fakeData = {
      '2019-04-04': {
        '2019-04-04T13:00:00-04:00': 372955,
        '2019-04-04T11:30:00-04:00': 399956,
        '2019-04-04T11:00:00-04:00': 372955
      },
      '2019-04-05': {
        '2019-04-05T11:30:00-04:00': 417239,
        '2019-04-05T16:00:00-04:00': 417239,
        '2019-04-05T18:00:00-04:00': 417239
      }
    }

    const advisors = transformAdvisorData(fakeData)

    expect(advisors['417239']).toContain('2019-04-05T11:30:00-04:00', '2019-04-05T16:00:00-04:00', '2019-04-05T18:00:00-04:00')
    expect(advisors['372955']).toContain('2019-04-04T11:00:00-04:00', '2019-04-04T13:00:00-04:00')
    expect(advisors['399956']).toContain('2019-04-04T11:30:00-04:00')
  })
})

describe('checkEmptyAvailability', () => {
  it('deletes an advisorId key from the object if it has no available times', () => {
    const fakeAvailability = {
      372955: ['2019-04-04T13:00:00-04:00', '2019-04-04T11:00:00-04:00'],
      372954: []
    }
    checkEmptyAvailability(fakeAvailability)
    expect(fakeAvailability.hasOwnProperty('372954')).toEqual(false)
  })
})

describe('updateAdvisorData', () => {
  it('should remove any bookings in the db from the availability', () => {
    const fakeAvailability = {
      372955: ['2019-04-04T13:00:00-04:00', '2019-04-04T11:00:00-04:00'],
      372954: ['2019-04-04T13:00:00-04:00']
    }
    const fakeBookingsDb = [
      {
        bookingId: '121434kf',
        advisorId: '372955',
        studentName: 'Joe Previte',
        dateTime: '2019-04-04T13:00:00-04:00'
      }
    ]

    const expected = {
      372955: ['2019-04-04T11:00:00-04:00'],
      372954: ['2019-04-04T13:00:00-04:00']
    }
    const actual = updateAdvisorData(fakeBookingsDb, fakeAvailability)
    expect(actual['372955']).toEqual(expected['372955'])
  })
})

describe('GET /advisors', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/advisors')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /bookings', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/advisors')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
