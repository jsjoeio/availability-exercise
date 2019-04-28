const https = require('https')

function transformAdvisorData (data) {
  /**
   * @description - takes in advisor availability data and groups it by Advisor
   * @return - an object with keys corresponding to advisor ids and their availability
   */

  // initialize advisors
  const advisors = {}

  for (let day in data) {
    // Get the times and advisors like so [time, advisorId]
    let availableAdvisors = Object.entries(data[day])
    for (let i = 0; i < availableAdvisors.length; i++) {
      // Check if our advisors object already has the advisor id
      if (!advisors.hasOwnProperty(availableAdvisors[i][1])) {
        advisors[availableAdvisors[i][1]] = [availableAdvisors[i][0]]
      } else {
        advisors[availableAdvisors[i][1]].push(availableAdvisors[i][0])
      }
    }
  }
  return advisors
}

function fetchAdvisorData () {
  return new Promise(function (resolve, reject) {
    https.get('https://www.thinkful.com/api/advisors/availability', res => {
      res.setEncoding('utf8')
      let body = ''
      res.on('data', data => {
        body += data
      })
      res.on('end', () => {
        body = JSON.parse(body)
        resolve(body)
      })
    })
  })
}

function updateAdvisorData (bookingsDb, availability) {
  if (bookingsDb.length === 0) return availability
  for (let i = 0; i < bookingsDb.length; i++) {
    const advisorId = bookingsDb[i].advisorId
    const bookedDatetime = bookingsDb[i].dateTime
    // Remove bookedDatetime from availability
    availability[advisorId] = availability[advisorId].filter(dateTime => dateTime !== bookedDatetime)
  }
  return availability
}

function checkEmptyAvailability (availability) {
  const advisorKeys = Object.keys(availability)
  for (let i = 0; i < advisorKeys.length; i++) {
    if (availability[advisorKeys[i]].length === 0) {
      delete availability[advisorKeys[i]]
    }
  }
  return availability
}

module.exports = {
  transformAdvisorData,
  fetchAdvisorData,
  updateAdvisorData,
  checkEmptyAvailability
}
