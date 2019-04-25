const express = require('express')
const https = require('https')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/today', (req, res) => {
  res.send({
    today: today()
  })
})

app.get('/advisors', (req, res) => {
  fetchAdvisorData()
    .then(data => {
      const advisorData = transformAdvisorData(data)
      res.send(advisorData)
    })
})

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

function today () {
  return new Date().toLocaleDateString()
}

app.today = today
module.exports = app
