import { transformAvailabilityData } from './helpers'

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

    const advisors = transformAvailabilityData(fakeData)

    expect(advisors['417239']).toContain('2019-04-05T11:30:00-04:00', '2019-04-05T16:00:00-04:00', '2019-04-05T18:00:00-04:00')
    expect(advisors['372955']).toContain('2019-04-04T11:00:00-04:00', '2019-04-04T13:00:00-04:00')
    expect(advisors['399956']).toContain('2019-04-04T11:30:00-04:00')
  })
})
