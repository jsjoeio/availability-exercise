const express = require('express')
const https = require('https')
const cors = require('cors')
const bodyParser = require('body-parser')
const { transformAdvisorData } = require('./utils/helpers')
const app = express()
app.use(cors())
app.use(bodyParser.json())

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
